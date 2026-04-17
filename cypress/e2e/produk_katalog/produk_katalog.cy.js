import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = "/katalog";

Given("User membuka halaman katalog", () => {
  cy.visit(BASE_URL);
  cy.get('[data-cy^=product-item]')
  .should('have.length.greaterThan', 0);
});

When("User mencari produk dengan keyword {string}", (keyword) => {
  cy.get('[data-cy=input-search]').clear().type(keyword);
  cy.get('[data-cy=btn-search]').click();
});

Then("Produk yang relevan ditampilkan", () => {
  cy.get('[data-cy=product-item]').should('exist');
});

Then("Empty state ditampilkan", () => {
  cy.get('[data-cy=empty-state-title]').should('exist');
});

Then("Semua produk ditampilkan", () => {
  cy.get('[data-cy=product-item]').its('length').should('be.gte', 1);
});



When("User memfilter kategori {string}", (kategori) => {
  cy.get('[data-cy=btn-open-filter]').click();
  cy.get(`[data-cy=filter-${kategori}]`).click();
  cy.get('[data-cy=btn-apply-filter]').click();
});

Then("Produk kategori tersebut ditampilkan", () => {
  cy.get('[data-cy=product-item]').should('exist');
});

When("User membuka katalog dengan kategori invalid", () => {
  cy.visit('/katalog?filter_kategori=invalid');
});


When("User memfilter stok {string}", (stok) => {
  cy.get('[data-cy=btn-open-filter]').click();
  cy.get(`[data-cy=filter-stok-${stok}]`).click();
  cy.get('[data-cy=btn-apply-filter]').click();
});

Then("Produk dengan stok ready ditampilkan", () => {
  cy.get('[data-cy=product-item]').should('exist');
});

Then("Produk stok habis ditampilkan", () => {
  cy.get('[data-cy=product-item]').should('exist');
});