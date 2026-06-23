import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: TC-PGW001-DT-01
Given("user_pegawai berada di halaman login", () => {
  cy.visit("/login");
});

When("pegawai mengisi username {string} dan password {string}", (username, password) => {
  cy.get("#usernameInput").clear().type(username);
  cy.get("#passwordInput").clear().type(password);
});

When("pegawai klik tombol login", () => {
  cy.get("#btnLogin").click();
});

Then("pegawai harus diarahkan ke halaman dashboard", () => {
  cy.url().should("include", "/admin/manage-transaksi");
});

// Scenario: TC-PGW001-DT-02, TC-PGW001-DT-03, TC-PGW001-DT-04
Then("pegawai harus tetap di halaman login dengan pesan error {string}", (pesanError) => {
  cy.url().should("include", "/login");
  cy.verifyNotification(pesanError);
});

// Scenario: TC-PGW001-A
Given("pegawai berada di halaman dashboard", () => {
  cy.loginPegawai();
  cy.visit("/admin/manage-transaksi");
});

When("pegawai klik tombol logout", () => {
  cy.get('[data-cy="logout-button"]').click();
});

Then("pegawai harus diarahkan ke halaman login", () => {
  cy.url().should("include", "/login");
});