import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("guest open the katalog page", () => {
    cy.visit("/katalog");
});

Then("guest should see the product list", () => {
    cy.get('.px-16 > .grid').should('be.visible');
});

Then("guest should see at least one product item", () => {
    // cy.get('[data-cy=product-item]')
    //     .its('length')
    //     .should('be.greaterThan', 0);
    cy.get('[href="http://127.0.0.1:8000/katalog/kemeja-kotak-1"] > .group').should('be.visible');
});

When("guest search product with keyword {string}", (keyword) => {
    // cy.get('[data-cy=search-input]')
    cy.get('.md\:w-auto > .flex > .flex-1')
        .should('be.visible')
        .type(keyword);
});

When("guest filter by category {string}", (category) => {
    cy.get('.p-3').click(); 
    cy.get(`[data-id="${category}"]`).click();
    // cy.get('[data-cy=filter-category]')
    //     .select(category);
});

When("guest filter by size {string}", (size) => {
    // cy.get(`[data-id="size-${size}"]`).click();
    size = size.toLowerCase();
    cy.get(`[data-id="size-${size}"]`).click();
    // cy.get('[data-id="size-l"]').click();
    // cy.get('[data-cy=filter-size]')
    //     .select(size);
});

// When("guest filter by availability {string}", (availability) => {
//     // cy.get('[data-cy=filter-availability]')
//     //     .select(availability);
//     cy.get(`[data-id="availability-${availability}"]`).click();
// });

// Then("guest should see filtered products", () => {
//     cy.get('[data-cy=product-item]').each(($el) => {
//         cy.wrap($el).should('be.visible');
//     });
// });

Then("guest should see filtered products", () => {
    cy.get('[data-cy=product-item]').each(($el) => {
        cy.wrap($el).should('contain.text', 'Kemeja');
    });
});