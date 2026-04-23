import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let STOCK;

Given("Customer membuka halaman detail produk", () => {
  cy.visit("/katalog/1");

  cy.get('[data-cy=product-detail]').should('exist');

  cy.get('[data-cy=product-stock]')
    .invoke('text')
    .then((text) => {
      STOCK = parseInt(text.replace(/\D/g, ''));
    });
});

// Product Detail Validation

Then("Nama produk tampil", () => {
  cy.get('[data-cy=product-name]').should('be.visible');
});

Then("Harga produk tampil", () => {
  cy.get('[data-cy=product-price]').should('be.visible');
});

Then("Stok produk tampil", () => {
  cy.get('[data-cy=product-stock]').should('be.visible');
});

Then("Gambar utama tampil", () => {
  cy.get('[data-cy=main-image]').should('be.visible');
});

Then("Thumbnail tersedia", () => {
  cy.get('[data-cy^=thumbnail-]').should('have.length.greaterThan', 0);
});

Then("Size selector tersedia", () => {
  cy.get('[data-cy^=size-]').should('have.length.greaterThan', 0);
});

Then("Color selector tersedia", () => {
  cy.get('[data-cy^=color-]').should('have.length.greaterThan', 0);
});

Then("Quantity control tersedia", () => {
  cy.get('[data-cy=qty-increase]').should('be.visible');
  cy.get('[data-cy=qty-decrease]').should('be.visible');
  cy.get('[data-cy=qty-value]').should('be.visible');
});
Then("Total harga tampil", () => {
  cy.get('[data-cy=total-price]').should('be.visible');
});

Then("Tombol aksi tersedia", () => {
  cy.get('[data-cy=btn-add-to-cart]').should('be.visible');
  cy.get('[data-cy=btn-checkout]').should('be.visible');
});

// modal
When("Customer membuka panduan ukuran", () => {
  cy.get('[data-cy=btn-size-guide]').click();
});

Then("Modal panduan ukuran tampil", () => {
  cy.verifyModal();
});


// Quantity & Default validation

Then("Quantity default adalah {int}", (value) => {
  cy.get('[data-cy=qty-value]').should('have.value', value);
});

When("Customer menambah quantity hingga {int}", (value) => {
  for (let i = 1; i < value; i++) {
    cy.get('[data-cy=qty-increase]').click();
  }
});

//BVA

Then("Quantity menjadi {int}", (value) => {
  cy.get('[data-cy=qty-value]').should('have.value', value);
});

When("Customer menambah quantity hingga stok maksimum", () => {
  for (let i = 1; i < STOCK; i++) {
    cy.get('[data-cy=qty-increase]').click();
  }
});

Then("Quantity sama dengan stok", () => {
  cy.get('[data-cy=qty-value]').should('have.value', STOCK);
});

When("Customer mengurangi quantity di bawah 1", () => {
  cy.get('[data-cy=qty-decrease]').should('be.disabled');
});

Then("Quantity tetap {int}", (value) => {
  cy.get('[data-cy=qty-value]').should('have.value', value);
});

When("Customer menambah quantity melebihi stok", () => {
  for (let i = 1; i <= STOCK+2; i++) {
    if(i>=STOCK){
      cy.get('[data-cy=qty-increase]').should('be.disabled')
      break;
    }
    cy.get('[data-cy=qty-increase]').click();
    
  }

});

Then("Quantity tidak melebihi stok", () => {
  cy.get('[data-cy=qty-value]').should('have.value', STOCK);
});


// checkout flow

When("Customer melanjutkan ke checkout", () => {
  cy.get('[data-cy=btn-checkout]').click();
});

Then("Checkout berhasil", () => {
  cy.url().should('include', '/checkout');
});