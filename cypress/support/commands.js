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
    cy.get('#btnLogin').click()
    cy.url().should("include", "/admin/statistik-transaksi")
  })
})

Cypress.Commands.add('loginPegawai', () => {
  cy.session("pegawai-session", () => {
    cy.visit("/login")
    cy.get('#usernameInput').type("budi.santoso")
    cy.get('#passwordInput').type("pegawai")
    cy.get('#btnLogin').click()
    cy.url().should("include", "/admin/manage-transaksi")
  })
})


// ─── Dialog Helper ────────────────────────────────────────────────────────────

// for custom full screen allert
Cypress.Commands.add("acceptConfirm", () => {
  cy.on("window:confirm", () => true);
});

Cypress.Commands.add("dismissConfirm", () => {
  cy.on("window:confirm", () => false);
});

// for generic modal
Cypress.Commands.add("verifyNotification", (message, options = {}) => {
  const timeout = options.timeout ?? 15000;
  cy.get("[data-cy=notification-modal]", { timeout }).should("be.visible");

  cy.get("[data-cy=notification-message]", { timeout })
    .should("contain.text", message)
    .and("be.visible");

  cy.get("#btnDismiss").click({ force: true });

  cy.get("#notificationOverlay").should("not.be.visible");
});

Cypress.Commands.add("verifyModal", () => {
  cy.get('[data-cy=modal-overlay]').should('be.visible');
  cy.get('[data-cy=close-modal]').click();
});

// for default browser alert
Cypress.Commands.add("acceptAlert", (expectedText = null) => {
  cy.on("window:confirm", (text) => {
    if (expectedText) {
      expect(text).to.include(expectedText);
    }
    return true; // OK
  });

  cy.on("window:alert", (text) => {
    if (expectedText) {
      expect(text).to.include(expectedText);
    }
  });
});

Cypress.Commands.add("dismissAlert", () => {
  cy.on("window:confirm", () => false); // Cancel
});


// Checkout helper

Cypress.Commands.add('fillCustomerInfo', ({
  name,
  email,
  phone
}) => {
  cy.get('[data-cy=input-full-name]')
    .clear()
    .type(name);

  cy.get('[data-cy=input-email]')
    .clear()
    .type(email);

  cy.get('[data-cy=input-phone]')
    .clear()
    .type(phone);
});

Cypress.Commands.add('fillShippingAddress', ({
  address,
  destination,
  postal
}) => {
  cy.get('[data-cy=input-address]')
    .clear()
    .type(address);

  cy.get('[data-cy=input-destination]')
    .clear()
    .type(destination);

  cy.get('[data-cy=destination-results]', {
    timeout: 20000
  }).should('be.visible');

  cy.get('[data-cy=destination-results]', {
    timeout: 20000
  }).eq(0).click();

  cy.get('[data-cy=input-postal-code]')
    .clear()
    .type(postal);
});

// Cypress.Commands.add('selectShipping' () => {

// });

Cypress.Commands.add('selectShipping', (shippingName) => {
  cy.contains('[data-cy=shipping-option]', shippingName, {
    timeout: 15000
  })
    .should('be.visible')
    .click();
});

Cypress.Commands.add('fillValidCheckoutForm', () => {
  cy.fillCustomerInfo({
    name: 'Budi Setiawan',
    email: 'budi@example.com',
    phone: '081234567890'
  });

  cy.fillShippingAddress({
    address: 'Jl Mawar No 12',
    destination: 'Surabaya',
    postal: '60241'
  });
});
