import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I login as admin", () => {
  cy.loginAdmin();
});

When("I open halaman statistik transaksi", () => {
  cy.visit("/admin/statistik-transaksi");
});

Then("statistik transaksi should be displayed properly", () => {
  cy.get("[data-cy=stat-card-total-products]").should("exist");
  cy.get("[data-cy=stat-card-custom-order]").should("exist");
  cy.get("[data-cy=stat-card-product-sold]").should("exist");
  cy.get("[data-cy=stat-card-total-orders]").should("exist");

  cy.get("[data-cy=sales-chart]").should("exist");

  cy.get("[data-cy=transactions-table]").should("exist");

  cy.get("[data-cy=total-revenue]")
    .should("contain", "Rp");
});

When("I click export spreadsheet button", () => {
  cy.get("[data-cy=export-spreadsheet-btn]").click();
});

Then("file laporan transaksi should be downloaded", () => {
    cy.task("findDownloadedFile", ".xlsx")
      .should("exist");
  });

When("I select month filter {string}", (month) => {
  cy.get("[data-cy=month-filter-main]").select(month);
});

Then("statistik transaksi should match selected month", () => {
    cy.url().should("include", "bulan=1");
  
    cy.get("[data-cy=transactions-table]")
      .should("exist");
  
    cy.get("[data-cy=transaction-row], [data-cy=empty-transactions]")
      .should("exist");
  
    cy.get("[data-cy=stat-card-total-orders]")
      .should("exist")
      .and("not.contain", "-");
  
    cy.get("[data-cy=sales-chart]")
      .should("exist");
  });