import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("guest open the landing page", () => {
    cy.visit("/");
});

Then("guest should see the hero section", () => {
    cy.get('[data-cy=hero-section]').should('be.visible');
});

Then("guest should see the stats section", () => {
    cy.get('[data-cy=stats-section]').should('be.visible');
});

Then("guest should see the katalog section", () => {
    cy.get('[data-cy=section-katalog]').should('be.visible');
});

Then("guest should see at least one product item", () => {
    cy.get('[data-cy=product-item]')
        .its('length')
        .should('be.greaterThan', 0);
});

Then("guest should see the WhatsApp button", () => {
    cy.get('[data-cy=btn-whatsapp]').should('be.visible');
});

Then("guest should see the custom uniform button", () => {
    cy.get('[data-cy=btn-custom-uniform]').should('be.visible');
});

Then("guest should see the location section", () => {
    cy.get('[data-cy=location-section]').should('be.visible');
});


When("guest click the WhatsApp button", () => {
    cy.get('[data-cy=btn-whatsapp]')
        .should('have.attr', 'href')
        .and('include', 'wa.me');

    // remove target="_blank" so Cypress stays in same tab
    cy.get('[data-cy=btn-whatsapp]')
        .invoke('removeAttr', 'target')
        .click();
});

Then("guest should be redirected to WhatsApp", () => {
    cy.origin('https://wa.me', () => {
        cy.url().should('include', '6287893385014');
      });
});