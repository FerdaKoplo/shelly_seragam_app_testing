import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


When("User melakukan klik di produk pertama", (keyword) => {
    cy.get('[data-cy=product-item]').first().click();
  });
  
Then("detail produk yang relevan ditampilkan", () => {
    cy.url().should("include", "/katalog/");
});
  
