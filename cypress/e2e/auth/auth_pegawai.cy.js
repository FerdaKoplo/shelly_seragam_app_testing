import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ─── TC-PGW001 ───────────────────────────────────────────────────────────────

Given("user_pegawai berada di halaman login", () => {
  cy.visit("/login");
});

When("pegawai mengisi username {string} dan password {string}", (username, password) => {
  cy.get("#usernameInput").type(username);
  cy.get("#passwordInput").type(password);
});

When("pegawai klik tombol login", () => {
  cy.get(".bg-neutral").click();
});

Then("pegawai harus diarahkan ke halaman dashboard", () => {
  cy.url().should("include", "/admin/manage-transaksi");
});

// ─── TC-PGW001-A ─────────────────────────────────────────────────────────────

Given("pegawai sudah login dan berada di halaman dashboard", () => {
  cy.loginPegawai();
  cy.visit("/admin/manage-transaksi");
});

When("pegawai klik tombol logout", () => {
  cy.get('[data-cy="logout-button"]').click();
});

Then("pegawai harus diarahkan ke halaman login", () => {
  cy.url().should("include", "/login");
});

// ─── TC-PGW001-NEG ───────────────────────────────────────────────────────────

Given("user berada di halaman login sebagai pegawai", () => {
  cy.visit("/login");
});

Then("pegawai harus tetap di halaman login dengan pesan error", () => {
  cy.get(".absolute > .font-inter").should("be.visible");
  cy.get(".absolute > .font-inter").click();
  cy.url().should("include", "/login");
});
