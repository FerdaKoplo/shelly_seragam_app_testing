import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { configureKustomForCheckout } from "../../support/step_definitions/kustom_flow_shared.js";

// Reuses checkout steps from checkout_katalog.cy.js:
// - Customer membuka halaman checkout
// - Customer mengisi data checkout kustom yang valid
// - Customer memilih tujuan pengiriman
// - Customer memilih opsi pengiriman
// - Customer klik tombol buat pesanan
// - Sistem menampilkan notifikasi pesanan berhasil

// Reuses kustom page steps from produk_kustom.cy.js when scenarios configure step-by-step.

/**
 * TC-CUS006-KUSTOM — mirrors Given Customer memiliki produk katalog di keranjang
 */
Given("Customer memiliki konfigurasi produk kustom siap checkout", () => {
  configureKustomForCheckout();
});

/**
 * TC-CUS006-KUSTOM
 */
Then("Customer berada di halaman checkout kustom", () => {
  cy.url().should("include", "/checkout");
  cy.get("[data-cy=checkout-page]").should("exist");
  cy.get('[data-cy=checkout-type]').should("have.value", "kustom");
});

/**
 * TC-CUS006-KUSTOM — custom-summary + order-summary on checkout.blade.php
 */
Then("Ringkasan pesanan kustom tampil", () => {
  cy.get("[data-cy=custom-summary]").should("be.visible");
  cy.get("[data-cy=order-summary]").should("be.visible");
  cy.get("[data-cy=submit-checkout]")
    .should("be.visible")
    .and("contain.text", "Buat Pesanan");
});
