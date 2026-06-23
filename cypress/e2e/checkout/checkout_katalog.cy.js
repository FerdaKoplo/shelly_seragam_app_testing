import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const ORDER_SUCCESS_MESSAGE =
  "Pesanan berhasil dibuat, Anda akan dihubungi oleh CS untuk konfirmasi dan finalisasi harga.";

/** Xendit hosted checkout (test mode). */
const XENDIT_ORIGIN = "https://checkout-staging.xendit.co";

/** Same path Xendit success_redirect_url uses (see routes/web.php). */
const CHECKOUT_SUCCESS_CALLBACK =
  "/checkout?checkout_success=1&type=katalog";

Given('Customer memiliki produk katalog di keranjang', () => {
    cy.visit("/katalog");

    // wait katalog rendered
    cy.get('[data-cy=product-item]')
        .should('have.length.greaterThan', 0);

    // click first available product
    cy.get('[data-cy=product-item]')
        .first()
        .click();

    // verify redirected to detail page
    cy.url().should('match', /\/katalog\/\d+/);

    cy.get('[data-cy=product-detail]').should('exist');

    cy.get('[data-cy=btn-add-to-cart]')
        .click();

    cy.visit('/checkout');
});


When('Customer membuka halaman checkout', () => {
    cy.get('[data-cy=checkout-page]')
        .should('exist');
});

Then('Ringkasan pesanan tampil', () => {
    cy.get('[data-cy=order-summary]')
        .should('be.visible');
});

When('Customer mengisi data checkout katalog yang valid', () => {
    cy.fillCustomerInfo({
        name: 'Rina Wijayanti',
        email: 'rina@gmail.com',
        phone: '082134567890'
    });

    // cy.fillShippingAddress({
    //     address: 'Jl. Diponegoro No. 12',
    //     destination: 'Surabaya',
    //     postal: '60241'
    // });
});

When('Customer mengisi nomor hp {string}', (phone) => {
    cy.get('[data-cy=input-phone]')
        .clear()
        .type(phone);
});

When("Customer mengisi data checkout dengan kode pos {string}", function (postal) {
    cy.get('[data-cy=input-postal-code]')
        .clear()
        .type(postal);
});

When('Customer mengisi data checkout kustom yang valid', () => {
    cy.fillCustomerInfo({
        name: 'Budi Prasetyo',
        email: 'budi@gmail.com',
        phone: '081234567890'
    });

    //   cy.fillShippingAddress({
    //     address: 'Jl. Melati No. 10',
    //     destination: 'Surabaya',
    //     postal: '60241'
    //   });
});

When('Customer memilih tujuan pengiriman', () => {
    let destination = "Surabaya";

    //1. Clear and type with a small delay to allow Alpine.js to capture the input event
    cy.get('[data-cy=input-address]')
        .clear()
        .type("Jl. Melati No. 10");

    cy.get('[data-cy=input-destination]')
        .clear()
        .type(destination); // Gives Alpine time to trigger searchDestinations()

    cy.get('[data-cy=input-destination]')
        .clear()
        .type(destination, { delay: 100 }); // Gives Alpine time to trigger searchDestinations()

    cy.get('[data-cy=input-destination]')
        .should('have.value', 'Surabaya');

    // 2. Wait for the dropdown container to be visible
    cy.get('[data-cy=destination-results]', { timeout: 15000 })
        .should('be.visible');

    // 3. TARGET THE RENDERED BUTTONS DIRECTLY
    // Instead of > :nth-child(2), find the actual generated options
    cy.get('[data-cy=destination-option]', { timeout: 15000 })
        .should('have.length.greaterThan', 0) // Ensure Alpine has finished rendering them
        .eq(0) // Selects the 1st option (change to .eq(1) if you strictly need the 2nd option)
        .should('be.visible')
        .click();

});

When('Customer memilih opsi pengiriman', (shipping) => {
    // cy.selectShipping(shipping);
    cy.get('[data-cy=shipping-option]')
        .should('be.visible').first()
        .click();
});

When('Customer klik tombol bayar', () => {
    cy.on('window:confirm', () => true);

    cy.intercept('POST', '**/checkout')
        .as('checkout');

    cy.get('[data-cy=submit-checkout]')
        .click();

    cy.wait('@checkout')
        .its('response.statusCode')
        .should('be.oneOf', [200, 302]);
});

Then('Customer diarahkan ke halaman pembayaran Xendit', () => {
    // Browser is on Xendit — all commands here must run inside cy.origin()
    cy.origin(XENDIT_ORIGIN, () => {
        cy.url({ timeout: 30000 }).should("include", "xendit.co");
    });
});

When("Customer menyelesaikan pembayaran di Xendit", () => {
    cy.origin(XENDIT_ORIGIN, () => {
        cy.get('[data-testid="payment-channel-list-bank-transfer"]').click();
        cy.get('[data-testid="payment-channel-mandiri"] > .flex').click();
        cy.get('[data-testid="simulate-button"]', { timeout: 120000 }).click();
        cy.get('[data-testid="success-description"]', { timeout: 120000 }).should(
            "be.visible",
        );
    });

    // Back on app origin: Xendit's redirect often breaks Cypress, so open success_redirect_url
    cy.visit(CHECKOUT_SUCCESS_CALLBACK);
    cy.url({ timeout: 15000 }).should("include", "/checkout");
    cy.get("[data-cy=checkout-page]").should("exist");
});

Then('Sistem menampilkan notifikasi pesanan berhasil', () => {
    cy.verifyNotification(ORDER_SUCCESS_MESSAGE, { timeout: 20000 });
});



When('Customer klik tombol buat pesanan', () => {
    cy.on('window:confirm', () => true);

    cy.intercept('POST', '**/checkout')
        .as('checkout');

    cy.get('[data-cy=submit-checkout]')
        .click();

    cy.wait('@checkout')
        .its('response.statusCode')
        .should('be.oneOf', [200, 302]);
});


When('Customer klik tombol submit checkout', () => {
    cy.get('[data-cy=submit-checkout]').click();
});
Then('Field kode pos diterima', () => {
    cy.get('[data-cy=input-postal-code]').should('not.have.class', 'error');
});

Then('Field nomor hp diterima', () => {
    cy.get('[data-cy=input-phone]').should('not.have.class', 'error');
});

Then('Error {string} tampil', (message) => {
    cy.get('[data-cy^="error-"]')
        .contains(message)
        .should('be.visible');

});

When('Customer mengisi data customer valid', () => {
    cy.fillCustomerInfo({ name: 'Rina Wijayanti', email: 'rina@gmail.com', phone: '082134567890' });
    // cy.get('[data-cy=input-destination]').type('Surabaya');
    // sengaja tidak memilih opsi pengiriman
});