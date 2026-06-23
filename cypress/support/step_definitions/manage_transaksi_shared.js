import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { createFakeFile } from "./kustom_flow_shared.js";

/** @type {Record<string, string>} Maps to data-cy on transaksi/index.blade.php */
export const FILTER_CY_BY_TIPE = {
  Katalog: "filter-katalog",
  Kustom: "filter-kustom",
};

export const RESI_BARU = "JNE-E2E-20260525-001";

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

export function waitForVisibleTransaksiModal() {
  cy.get("[data-cy=modal-overlay]").should("be.visible");
  cy.get("[data-cy^=modal-transaksi-]")
    .filter(":visible")
    .should("have.length", 1);
}

export function withinVisibleTransaksiModal(fn) {
  waitForVisibleTransaksiModal();
  cy.get("[data-cy^=modal-transaksi-]").filter(":visible").first().within(fn);
}

export function openFirstTransaksiDetail() {
  cy.get("[data-cy=transaksi-table] tbody tr")
    .first()
    .find("[data-cy^=btn-detail-]")
    .click();
  waitForVisibleTransaksiModal();
}

export function openFirstTransaksiDetailByFilter(tipe) {
  clickFilterTransaksi(tipe);
  openFirstTransaksiDetail();
}

/**
 * Opens kustom rows until the modal shows the payment upload form
 * (no payments/kustom attachment yet).
 */
export function openKustomTransaksiNeedingPaymentUpload(rowIndex = 0) {
  clickFilterTransaksi("Kustom");

  cy.get("[data-cy=transaksi-table] tbody tr").then(($rows) => {
    expect($rows.length, "kustom transaksi rows").to.be.greaterThan(0);

    if (rowIndex >= $rows.length) {
      throw new Error(
        "Tidak ada transaksi kustom dengan form unggah bukti pembayaran. Pastikan database memiliki order kustom tanpa file di payments/kustom.",
      );
    }

    cy.wrap($rows.eq(rowIndex))
      .find("[data-cy^=btn-detail-]")
      .click();

    waitForVisibleTransaksiModal();

    cy.get("[data-cy^=modal-transaksi-]")
      .filter(":visible")
      .first()
      .then(($modal) => {
        const hasUploadForm =
          $modal.find("[data-cy^=form-upload-payment-]").length > 0;

        if (hasUploadForm) {
          return;
        }

        cy.wrap($modal).find("[data-cy^=modal-close-]").click({ force: true });
        cy.get("[data-cy=modal-overlay]").should("not.be.visible");
        openKustomTransaksiNeedingPaymentUpload(rowIndex + 1);
      });
  });
}

export function assertModalShowsKatalogItems() {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=modal-katalog-items-]").should("exist");
    cy.get("[data-cy^=modal-kustom-detail-]").should("not.exist");
  });
}

export function assertModalShowsKustomDetail() {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=modal-kustom-detail-]").should("exist");
    cy.get("[data-cy^=modal-katalog-items-]").should("not.exist");
  });
}

export function fillResiInOpenModal(resi = RESI_BARU) {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=input-resi-]").clear().type(resi);
  });
}

export function saveTransaksiInOpenModal() {
  withinVisibleTransaksiModal(() => {
    cy.get("[data-cy^=btn-simpan-]").click();
  });
}

export function rememberOpenTransaksiId() {
  cy.get("[data-cy^=modal-transaksi-]")
    .filter(":visible")
    .first()
    .invoke("attr", "data-cy")
    .then((dataCy) => {
      const transaksiId = String(dataCy).replace("modal-transaksi-", "");
      cy.wrap(transaksiId).as("openTransaksiId");
    });
}

export function uploadKustomPaymentInOpenModal() {
  rememberOpenTransaksiId();

  

  withinVisibleTransaksiModal(() => {
    // const file = createFakeFile({
    //   name: "bukti-pembayaran.jpg",
    //   sizeInMB: 0.05,
    //   type: "image/jpeg",
    // });
    cy.get("[data-cy^=form-upload-payment-]").should("be.visible");
    cy.get("[data-cy^=input-file-payment-]")
      .should("exist")
      .selectFile("bukti_transaksi.jpeg", { force: true });
      // uploadFilePembayaran(file);
      

  //     const dataTransfer = new DataTransfer();
  //     dataTransfer.items.add(file);

  // cy.get("[data-cy^=input-file-payment-]").then((input) => {
  //   const nativeInput = input[0];

  //   Object.defineProperty(nativeInput, "files", {
  //     value: dataTransfer.files,
  //     writable: false,
  //   });

  //   nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
  // });

    cy.get("[data-cy^=btn-upload-payment-]").click({ force: true });
  });
}

// export function uploadFilePembayaran(file) {
//   const dataTransfer = new DataTransfer();
//   dataTransfer.items.add(file);

//   cy.get("[data-cy^=input-file-payment-]").then((input) => {
//     const nativeInput = input[0];

//     Object.defineProperty(nativeInput, "files", {
//       value: dataTransfer.files,
//       writable: false,
//     });

//     nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
//   });
// }
export function reopenTransaksiAndAssertPaymentUploaded() {
  cy.get("@openTransaksiId").then((transaksiId) => {
    cy.get(`[data-cy=btn-detail-${transaksiId}]`).click();
    withinVisibleTransaksiModal(() => {
      cy.get(`[data-cy=payment-uploaded-${transaksiId}]`).should("be.visible");
      cy.get(`[data-cy=form-upload-payment-${transaksiId}]`).should("not.exist");
    });
  });
}

export function assertTransaksiListVisible() {
  cy.url().should("include", "/admin/manage-transaksi");
  cy.get("[data-cy=transaksi-table]").should("be.visible");
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

/**
 * TC-ADM005-F / TC-PGW004-F
 */
Then("bukti pembayaran kustom berhasil diunggah", () => {
  cy.verifyNotification("Bukti pembayaran kustom berhasil diunggah.");
  assertTransaksiListVisible();
  reopenTransaksiAndAssertPaymentUploaded();
});
