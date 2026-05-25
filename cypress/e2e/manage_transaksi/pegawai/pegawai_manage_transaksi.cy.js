import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  assertModalShowsKatalogItems,
  assertModalShowsKustomDetail,
  clickFilterTransaksi,
  openFirstTransaksiDetailByFilter,
  openKustomTransaksiNeedingPaymentUpload,
  uploadKustomPaymentInOpenModal,
  searchTransaksiFromFirstCustomer,
  withinVisibleTransaksiModal,
  waitForVisibleTransaksiModal,
} from "../../../support/step_definitions/manage_transaksi_shared.js";

// ─── Shared navigation ────────────────────────────────────────────────────────

/**
 * TC-PGW004-A / TC-PGW004-B
 */
When("pegawai navigasi ke halaman manage transaksi", () => {
  cy.loginPegawai();
  cy.visit("/admin/manage-transaksi");
});

/**
 * TC-PGW004-A / TC-PGW004-B
 */
Then("pegawai diarahkan ke halaman manage transaksi", () => {
  cy.url().should("include", "/admin/manage-transaksi");
  cy.get("[data-cy=transaksi-table]").should("be.visible");
});

// ─── TC-PGW004-A : Lihat Daftar & Detail Transaksi ───────────────────────────

/**
 * TC-PGW004-A
 */
Then("pegawai melihat daftar transaksi tersedia di tabel", () => {
  cy.get("[data-cy=transaksi-table]").within(() => {
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  cy.get("[data-cy=transaksi-table] tbody tr")
    .first()
    .within(() => {
      cy.get("td").eq(0).invoke("text").should("match", /^#TRX\d+/);
      cy.get("td").eq(1).invoke("text").should("not.be.empty");
      cy.get("td").eq(2).invoke("text").should("match", /Katalog|Kustom/);
    });
});

/**
 * TC-PGW004-A / TC-PGW004-B
 */
When("pegawai mengklik tombol detail pada salah satu transaksi", () => {
  cy.get("[data-cy=transaksi-table] tbody tr")
    .first()
    .find("[data-cy^=btn-detail-]")
    .click();
  waitForVisibleTransaksiModal();
});

/**
 * TC-PGW004-A / TC-PGW004-B
 */
Then("modal detail transaksi terbuka untuk pegawai", () => {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=modal-title-]")
      .invoke("text")
      .should("match", /Detail Transaksi/);
  });
});

/**
 * TC-PGW004-A
 */
Then("modal menampilkan informasi customer untuk pegawai", () => {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=modal-customer-name-]")
      .invoke("text")
      .should("not.be.empty");
    cy.get("[data-cy^=modal-customer-alamat-]")
      .invoke("text")
      .should("not.be.empty");
  });
});

/**
 * TC-PGW004-A
 */
Then("modal menampilkan detail item pesanan untuk pegawai", () => {
  withinVisibleTransaksiModal(() => {
    cy.get(
      "[data-cy^=modal-katalog-items-],[data-cy^=modal-kustom-detail-]",
    ).should("exist");
    cy.get("[data-cy^=modal-total-]")
      .invoke("text")
      .should("match", /Rp[\s\d.,]+/);
  });
});

// ─── TC-PGW004-B : Ubah Status Transaksi ─────────────────────────────────────

/**
 * TC-PGW004-B
 */
When("pegawai mengisi nomor resi customer", () => {
  cy.get("[data-cy^=input-resi-]")
    .first()
    .clear()
    .type("JNE-20260101-001");
});

/**
 * TC-PGW004-B
 */
When("pegawai mengklik tombol simpan perubahan transaksi", () => {
  cy.get("[data-cy^=btn-simpan-]").first().click();
});

/**
 * TC-PGW004-B
 */
Then("perubahan transaksi berhasil disimpan oleh pegawai", () => {
  cy.url().should("include", "/admin/manage-transaksi");
  cy.get("[data-cy=transaksi-table]").should("be.visible");
  cy.verifyNotification("Detail transaksi berhasil diperbarui");
});

// ─── TC-PGW004-C : Filter Transaksi ──────────────────────────────────────────

/**
 * TC-PGW004-C
 */
When("pegawai memilih filter transaksi {string}", (tipe) => {
  clickFilterTransaksi(tipe);
});

/**
 * TC-PGW004-C
 */
When("pegawai mereset filter transaksi", () => {
  cy.get("[data-cy=filter-reset]").should("be.visible").click();
  cy.url().should("include", "/admin/manage-transaksi");
  cy.url().should("not.include", "filter=");
});

// ─── TC-PGW004-D : Cari Transaksi ────────────────────────────────────────────

/**
 * TC-PGW004-D
 */
When("pegawai mencari transaksi dengan kata kunci dari transaksi pertama", () => {
  searchTransaksiFromFirstCustomer();
});

// ─── TC-PGW004-E : Perbarui Transaksi Katalog ────────────────────────────────

/**
 * TC-PGW004-E
 */
When("pegawai membuka detail transaksi katalog pertama", () => {
  openFirstTransaksiDetailByFilter("Katalog");
});

/**
 * TC-PGW004-E
 */
Then("modal detail transaksi katalog terbuka untuk pegawai", () => {
  waitForVisibleTransaksiModal();
  assertModalShowsKatalogItems();
});

// ─── TC-PGW004-F : Unggah Bukti Pembayaran Kustom ─────────────────────────────

/**
 * TC-PGW004-F
 */
When("pegawai membuka detail transaksi kustom yang belum ada bukti pembayaran", () => {
  openKustomTransaksiNeedingPaymentUpload();
});

/**
 * TC-PGW004-F
 */
Then("modal detail transaksi kustom terbuka untuk pegawai", () => {
  waitForVisibleTransaksiModal();
  assertModalShowsKustomDetail();
});

/**
 * TC-PGW004-F
 */
Then("modal menampilkan form unggah bukti pembayaran kustom untuk pegawai", () => {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=form-upload-payment-]").should("be.visible");
    cy.get("[data-cy^=input-file-payment-]").should("exist");
    cy.get("[data-cy^=btn-upload-payment-]").should("be.visible");
  });
});

/**
 * TC-PGW004-F
 */
When("pegawai mengunggah bukti pembayaran kustom", () => {
  uploadKustomPaymentInOpenModal();
});