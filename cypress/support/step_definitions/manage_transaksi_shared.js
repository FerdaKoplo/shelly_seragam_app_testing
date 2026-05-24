import { Then } from "@badeball/cypress-cucumber-preprocessor";

/** @type {Record<string, string>} Maps to data-cy on transaksi/index.blade.php */
export const FILTER_CY_BY_TIPE = {
  Katalog: "filter-katalog",
  Kustom: "filter-kustom",
};

export function clickFilterTransaksi(tipe) {
  const filterCy = FILTER_CY_BY_TIPE[tipe];
  cy.get(`[data-cy=${filterCy}]`).should("be.visible").click();
  cy.url().should("include", "/admin/manage-transaksi");
  cy.url().should("include", `filter=${tipe.toLowerCase()}`);
}

export function searchTransaksiFromFirstCustomer() {
  cy.get("[data-cy^=trx-customer-]")
    .first()
    .invoke("text")
    .then((customerName) => {
      const keyword = customerName.trim().split(/\s+/)[0];
      expect(keyword.length).to.be.greaterThan(0);

      cy.wrap(keyword).as("transaksiSearchKeyword");
      cy.get("[data-cy=transaksi-search-input]").clear().type(keyword);
      cy.get("[data-cy=transaksi-search-submit]").click();
    });

  cy.url().should("include", "/admin/manage-transaksi");
  cy.url().should("include", "search=");
}

/**
 * TC-ADM005-C / TC-PGW004-C
 */
Then("tabel transaksi hanya menampilkan tipe {string}", (tipe) => {
  cy.get("[data-cy=transaksi-table]").should("be.visible");
  cy.get("[data-cy=transaksi-empty]").should("not.exist");

  cy.get("[data-cy^=transaksi-row-]").should("have.length.greaterThan", 0);

  cy.get("[data-cy^=trx-tipe-]").each(($tipeCell) => {
    cy.wrap($tipeCell).should("have.text", tipe);
  });
});

/**
 * TC-ADM005-D / TC-PGW004-D
 */
Then("hasil pencarian transaksi menampilkan transaksi yang cocok", () => {
  cy.get("@transaksiSearchKeyword").then((keyword) => {
    cy.get("[data-cy=transaksi-empty]").should("not.exist");

    cy.get("[data-cy^=transaksi-row-]")
      .should("have.length.greaterThan", 0)
      .each(($row) => {
        cy.wrap($row).invoke("text").should("match", new RegExp(keyword, "i"));
      });
  });
});
