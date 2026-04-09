// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// AUTH HELPER
Cypress.Commands.add('loginAdmin', () => {
    cy.session("admin-session", () => {
        cy.visit("/login")
        cy.get('#usernameInput').type("admin")
        cy.get('#passwordInput').type("admin")
        cy.get('.bg-neutral').click()
        cy.url().should("include", "/admin/statistik-transaksi")
    })
})

Cypress.Commands.add('loginPegawai', () => {
    cy.session("pegawai-session", () => {
        cy.visit("/login")
        cy.get('#usernameInput').type("budi.santoso")
        cy.get('#passwordInput').type("pegawai")
        cy.get('.bg-neutral').click()
        cy.url().should("include", "/admin/manage-transaksi")
    })
})


// ─── Dialog Helper ────────────────────────────────────────────────────────────
Cypress.Commands.add("acceptConfirm", () => {
  cy.on("window:confirm", () => true);
});

Cypress.Commands.add("dismissConfirm", () => {
  cy.on("window:confirm", () => false);
});

Cypress.Commands.add("verifyNotification", (message) => {
  cy.get('#notificationOverlay > .relative').should('be.visible');
  cy.contains(message).should("be.visible");
  cy.get('#btnDismiss').click();
});


