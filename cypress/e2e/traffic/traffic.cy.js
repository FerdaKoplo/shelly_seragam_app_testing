import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("login sebagai admin", () => {
  cy.loginAdmin();
});

When("admin membuka menu monitoring traffic web", () => {
  cy.visit("/admin/traffic");

  cy.get("[data-cy=traffic-page]").should("exist");
});

Then("sistem menampilkan data traffic web Shelly Seragam", () => {

  cy.get("[data-cy=traffic-title]")
    .should("contain", "Statistik Pengunjung");

  cy.get("[data-cy=traffic-container]")
    .should("exist");

  cy.get("body").then(($body) => {

    // iframe configured
    if ($body.find("[data-cy=traffic-iframe]").length > 0) {

      cy.get("[data-cy=traffic-iframe]")
        .should("exist")
        .and("have.attr", "src")
    }

    // fallback state
    else {

      cy.get("[data-cy=traffic-not-configured]")
        .should("exist");

      cy.get("[data-cy=traffic-config-warning]")
        .should("contain", "belum dikonfigurasi");
    }

  });

});