import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  clickFilterTransaksi,
  searchTransaksiFromFirstCustomer,
} from "../../../support/step_definitions/manage_transaksi_shared.js";

// ─── Shared navigation ────────────────────────────────────────────────────────

/**
 * TC-ADM005-A / TC-ADM005-B
 */
When("admin navigasi ke halaman manage transaksi", () => {
  cy.loginAdmin();
  cy.visit("/admin/manage-transaksi");
});

/**
 * TC-ADM005-A / TC-ADM005-B
 */
Then("admin diarahkan ke halaman manage transaksi", () => {
  cy.url().should("include", "/admin/manage-transaksi");
  cy.get("[data-cy=transaksi-table]").should("be.visible");
});

// ─── TC-ADM005-A : Lihat Daftar & Detail Transaksi ───────────────────────────

/**
 * TC-ADM005-A
 */
Then("admin melihat daftar transaksi tersedia di tabel", () => {
  cy.get("[data-cy=transaksi-table]").within(() => {
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  // Spot-check that key columns render for the first row
  cy.get("[data-cy=transaksi-table] tbody tr")
    .first()
    .within(() => {
      cy.get("td").eq(0).invoke("text").should("match", /^#TRX\d+/);
      cy.get("td").eq(1).invoke("text").should("not.be.empty"); // customer name
      cy.get("td").eq(2).invoke("text").should("match", /Katalog|Kustom/);
    });
});

/**
 * TC-ADM005-A / TC-ADM005-B
 */
When("admin mengklik tombol detail pada salah satu transaksi", () => {
  cy.get("[data-cy=transaksi-table] tbody tr")
    .first()
    .find("[data-cy^=btn-detail-]")
    .click();
});

/**
 * TC-ADM005-A / TC-ADM005-B
 */
Then("modal detail transaksi terbuka", () => {
  cy.get("[data-cy=modal-overlay]").should("be.visible");
  cy.get("[data-cy^=modal-transaksi-]").should("be.visible");
  cy.get("[data-cy^=modal-title-]")
    .invoke("text")
    .should("match", /Detail Transaksi/);
});

/**
 * TC-ADM005-A
 */
Then("modal menampilkan informasi customer", () => {
  cy.get("[data-cy^=modal-customer-name-]")
    .invoke("text")
    .should("not.be.empty");
  cy.get("[data-cy^=modal-customer-alamat-]")
    .invoke("text")
    .should("not.be.empty");
});

/**
 * TC-ADM005-A
 */
Then("modal menampilkan detail item pesanan", () => {
  // Either katalog items or kustom detail panel must be present
  cy.get("[data-cy^=modal-katalog-items-],[data-cy^=modal-kustom-detail-]")
    .should("exist");
  cy.get("[data-cy^=modal-total-]")
    .invoke("text")
    .should("match", /Rp[\s\d.,]+/);
});

// ─── TC-ADM005-B : Ubah Status Transaksi ─────────────────────────────────────

/**
 * TC-ADM005-B
 */
When("admin mengisi nomor resi customer", () => {
  cy.get("[data-cy^=input-resi-]")
    .first()
    .clear()
    .type("JNE-20260101-001");
});

/**
 * TC-ADM005-B
 */
When("admin mengklik tombol simpan perubahan transaksi", () => {
  cy.get("[data-cy^=btn-simpan-]").first().click();
});

/**
 * TC-ADM005-B
 */
Then("perubahan transaksi berhasil disimpan", () => {
  // After form submit the page reloads back to the transaksi list
  cy.url().should("include", "/admin/manage-transaksi");
  cy.get("[data-cy=transaksi-table]").should("be.visible");

  cy.verifyNotification("Detail transaksi berhasil diperbarui");
});

// ─── TC-ADM005-C : Filter Transaksi ──────────────────────────────────────────

/**
 * TC-ADM005-C
 */
When("admin memilih filter transaksi {string}", (tipe) => {
  clickFilterTransaksi(tipe);
});

/**
 * TC-ADM005-C
 */
When("admin mereset filter transaksi", () => {
  cy.get("[data-cy=filter-reset]").should("be.visible").click();
  cy.url().should("include", "/admin/manage-transaksi");
  cy.url().should("not.include", "filter=");
});

// ─── TC-ADM005-D : Cari Transaksi ────────────────────────────────────────────

/**
 * TC-ADM005-D
 */
When("admin mencari transaksi dengan kata kunci dari transaksi pertama", () => {
  searchTransaksiFromFirstCustomer();
});