import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("guest click the WhatsApp button in location section", () => {
    cy.get('[data-cy=btn-whatsapp-location]')
        .should('have.attr', 'href')
        .and('include', 'wa.me');

    // remove target="_blank" so Cypress stays in same tab
    cy.get('[data-cy=btn-whatsapp-location]')
        .invoke('removeAttr', 'target')
        .click();
});