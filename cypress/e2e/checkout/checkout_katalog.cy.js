import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

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

    cy.get('[data-cy=btn-add-cart]')
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
        email: 'rina@example.com',
        phone: '082134567890'
    });

    cy.fillShippingAddress({
        address: 'Jl. Diponegoro No. 12',
        destination: 'Surabaya',
        postal: '60241'
    });
});

When('Customer mengisi data checkout kustom yang valid', () => {
    cy.fillCustomerInfo({
        name: 'Budi Prasetyo',
        email: 'budi@example.com',
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

    cy.get('[data-cy=input-address]')
        .clear()
        .type("Jl. Melati No. 10");

    cy.get('[data-cy=input-destination]')
        .clear()
        .type(destination);
    cy.get('[data-cy=input-destination]')
        .should('have.value', 'Surabaya');

    cy.get('[data-cy=destination-results]', {
        timeout: 20000
    }).should('be.visible');

    // cy.get('[data-cy=destination-option]', {
    //     timeout: 20000
    // }).should('be.visible');

    // cy.get('[data-cy=destination-results]', { timeout: 15000 })
    // .contains(new RegExp(`^${destination}$`, 'i')) // Optional: exact match, case insensitive
    // .click();
    // cy.get('[data-cy="destination-results"] > :nth-child(3)')
    cy.get('[data-cy="destination-results"] > :nth-child(2)', {
        timeout: 20000
    }).should('be.visible').click();

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

When('Customer klik tombol buat pesanan', () => {
    cy.on('window:confirm', () => true);

    cy.get('[data-cy=submit-checkout]')
        .click();
});

Then('Customer diarahkan ke halaman pembayaran Xendit', () => {
    cy.url({
        timeout: 20000
    }).should('include', 'xendit');
});

Then('Sistem menampilkan notifikasi pesanan berhasil', () => {
    cy.verifyNotification('Pesanan berhasil dibuat');
});