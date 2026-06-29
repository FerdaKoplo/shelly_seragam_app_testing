import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const selectors = {
  page: "[data-cy=voucher-page]",
  addButton: "[data-cy=btn-tambah-voucher-baru]",
  saveButton: "[data-cy=btn-submit-voucher]",
  searchInput: "[data-cy=voucher-search-input]",

  nameInput: "[data-cy=voucher-name-input]",
  codeInput: "[data-cy=voucher-code-input]",
  typeSelect: "[data-cy=voucher-type-select]",
  valueInput: "[data-cy=voucher-discount-input]",
  descInput: "[data-cy=voucher-description-input]",
  startInput: "[data-cy=voucher-start-date-input]",
  expiredInput: "[data-cy=voucher-end-date-input]",

  voucherRow: "[data-cy=voucher-card]",
};

const getTodayDate = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const getVoucherData = () => ({
  valid: {
    nama: "Promo Akhir Tahun",
    kode: `NEWPROMO-${Date.now()}`,
    jenis: "Nominal (Rp)",
    nilai: "10000",
    deskripsi: "voucher valid",
    tanggalMulai: "2026-12-30",
    tanggal: "2026-12-31",
  },
  duplicate: {
    nama: "Duplicate Promo",
    kode: "PROMOSELLER",
    jenis: "Nominal (Rp)",
    nilai: "10000",
    deskripsi: "voucher duplicate",
    tanggalMulai: "2026-12-21",
    tanggal: "2026-12-31",
  },
  percentage: {
    nama: "Voucher Persen",
    kode: `DISC-${Date.now()}`,
    jenis: "Persentase (%)",
    nilai: "10",
    deskripsi: "voucher persen",
    tanggalMulai: "2026-12-21",
    tanggal: "2026-12-31",
  },
});

const fillVoucherForm = (data) => {
  if (data.nama !== undefined)
    cy.get(selectors.nameInput).clear().type(data.nama);
  if (data.kode !== undefined)
    cy.get(selectors.codeInput).clear().type(data.kode);
  if (data.jenis !== undefined) cy.get(selectors.typeSelect).select(data.jenis);
  if (data.nilai !== undefined)
    cy.get(selectors.valueInput).clear().type(data.nilai);
  if (data.deskripsi !== undefined)
    cy.get(selectors.descInput).clear().type(data.deskripsi);
  if (data.tanggalMulai !== undefined)
    cy.get(selectors.startInput).clear().type(data.tanggalMulai);
  if (data.tanggal !== undefined)
    cy.get(selectors.expiredInput).clear().type(data.tanggal);
};

Given("admin already logged in", () => {
  cy.loginAdmin();
});

Given("admin open voucher management page", () => {
  cy.visit("/admin/manage-voucher");
  cy.get(selectors.page).should("exist");
});

Given("there should be a voucher with PROMOSELLER code", () => {
  // FIX 2: Gunakan fitur Search untuk menemukan data agar terhindar dari bug Pagination
  cy.get(selectors.searchInput).clear().type("PROMOSELLER{enter}");
  cy.wait(500); // Tunggu sebentar agar form disubmit dan DOM terupdate

  cy.get("body").then(($body) => {
    if (
      $body.find(`${selectors.voucherRow}:contains("PROMOSELLER")`).length > 0
    ) {
      cy.log("Voucher 'PROMOSELLER' already exists. Skipping creation.");
      cy.get(selectors.searchInput).clear().type("{enter}"); // Reset search bar
    } else {
      cy.log("Voucher 'PROMOSELLER' not found. Creating it now...");
      cy.get(selectors.addButton).click();
      fillVoucherForm(getVoucherData().duplicate);
      cy.get(selectors.saveButton).click();
      cy.verifyNotification("Voucher Berhasil Ditambahkan");
    }
  });
});

When("admin add voucher with valid data", () => {
  cy.get(selectors.addButton).click();
  cy.wrap(getVoucherData().valid).as("currentVoucher");
  cy.get("@currentVoucher").then((data) => {
    fillVoucherForm(data);
    cy.get(selectors.saveButton).click();
  });
});

Then("voucher successfully saved", () => {
  cy.verifyNotification("Voucher Berhasil Ditambahkan");
  cy.get("@currentVoucher").then((data) => {
    cy.contains(selectors.voucherRow, data.kode).should("exist");
  });
});

When("admin add voucher with duplicate code", () => {
  cy.get(selectors.addButton).click();
  fillVoucherForm(getVoucherData().duplicate);
  cy.get(selectors.saveButton).click();
});

Then("system should show duplicate code error", () => {
  cy.verifyNotification("Voucher Dengan Kode Yang Sama Sudah Dibuat");
});

When("admin update voucher value", () => {
  // Gunakan search agar aman
  cy.get(selectors.searchInput).clear().type("PROMOSELLER{enter}");

  cy.contains(selectors.voucherRow, "PROMOSELLER")
    .find("[data-cy=btn-edit-voucher]")
    .first()
    .click();

  cy.get(selectors.valueInput).clear().type("20000");
  cy.get(selectors.saveButton).click();
});

Then("voucher successfully updated", () => {
  cy.verifyNotification("Voucher Berhasil Diperbarui");
});

When("admin delete voucher", () => {
  // Gunakan search agar elemen mudah ditemukan
  cy.get(selectors.searchInput).clear().type("PROMOSELLER{enter}");

  cy.get("body").then(($body) => {
    // FIX 3: Cek apakah voucher masih aktif. Jika ya, nonaktifkan terlebih dahulu
    const deactivateBtn = $body.find(
      `${selectors.voucherRow}:contains("PROMOSELLER") [data-cy=btn-deactivate-voucher]`,
    );

    if (deactivateBtn.length > 0) {
      cy.wrap(deactivateBtn).first().click();
      // Mentarget form di dalam modal deactive_confirmation dan mensubmitnya
      cy.get('form[action*="deactivate"]').submit();
      cy.verifyNotification("Voucher Berhasil Dinonaktifkan");
    }
  });

  // Sekarang voucher sudah berstatus 'Habis', tombol delete pasti sudah muncul
  cy.acceptConfirm();
  cy.contains(selectors.voucherRow, "PROMOSELLER")
    .find("[data-cy=btn-delete-voucher]")
    .first()
    .click();
});

Then("voucher successfully deleted", () => {
  cy.verifyNotification("Voucher Berhasil Dihapus");
  cy.contains(selectors.voucherRow, "PROMOSELLER").should("not.exist");
});

// When("admin add voucher without code", () => {
//   cy.get(selectors.addButton).click();
//   fillVoucherForm({
//     nama: "Auto Voucher",
//     jenis: "Nominal (Rp)",
//     deskripsi: "voucher valid",
//     tanggalMulai: "2026-12-30",
//     tanggal: "2026-12-31",
//     nilai: "10000",
//   });
//   cy.get(selectors.saveButton).click();
//   cy.verifyNotification("Voucher Berhasil Ditambahkan");
// });
//
// Then("system should generate voucher code", () => {
//   cy.contains(selectors.voucherRow, "Auto Voucher")
//     .find("[data-cy=voucher-code]")
//     .invoke("text")
//     .should("not.be.empty");
// });

When("admin add voucher with invalid expired date", () => {
  cy.get(selectors.addButton).click();
  fillVoucherForm({
    nama: "Invalid Date",
    kode: "INVALIDDATE",
    jenis: "Nominal (Rp)",
    deskripsi: "voucher expired",
    nilai: "10000",
    tanggalMulai: "2025-01-01",
    tanggal: "2025-01-20",
  });
  cy.get(selectors.saveButton).click();
});

Then("system should reject voucher date", () => {
  cy.verifyNotification("Tanggal mulai tidak boleh kurang dari hari ini.");
});

When("admin submit empty voucher form", () => {
  cy.get(selectors.addButton).click();
  cy.get(selectors.saveButton).click();
});

Then("required validation should appear", () => {
  cy.get("input:invalid").should("have.length.at.least", 1);
});

When("admin create percentage voucher", () => {
  cy.get(selectors.addButton).click();
  fillVoucherForm(getVoucherData().percentage);
  cy.get(selectors.saveButton).click();
});

Then("percentage voucher successfully saved", () => {
  cy.verifyNotification("Voucher Berhasil Ditambahkan");
});

When("admin input negative discount value", () => {
  cy.get(selectors.addButton).click();
  cy.get(selectors.valueInput).type("-", { force: true });
});

Then("negative value should be rejected", () => {
  cy.get(selectors.valueInput).should("have.value", "");
});

When("admin search voucher {string}", (search) => {
  cy.get(selectors.searchInput).clear().type(`${search}{enter}`);
});

Then("matching voucher {string} should appear", (search) => {
  cy.contains(selectors.voucherRow, search).should("exist");
});

const resolveRelativeDate = (token) => {
  const map = { yesterday: -1, today: 0, tomorrow: 1 };
  if (Object.prototype.hasOwnProperty.call(map, token)) {
    const d = new Date();
    d.setDate(d.getDate() + map[token]);
    return d.toISOString().slice(0, 10);
  }
  return token;
};
// ─── EQP & BVA: Validasi Parameter Dinamis ─────────────────────────────────

When("admin create voucher with date {string}", (dateToken) => {
  const date = resolveRelativeDate(dateToken);
  cy.get(selectors.addButton).click();

  const dynamicCode = `DATE-${Date.now()}`;
  cy.wrap({ kode: dynamicCode }).as("currentVoucher");

  fillVoucherForm({
    nama: "Voucher Test Tanggal " + dateToken,
    kode: dynamicCode,
    jenis: "Nominal (Rp)",
    nilai: "10000",
    deskripsi: "Testing EQP/BVA Tanggal",
    tanggalMulai: getTodayDate(),
    tanggal: date,
  });

  cy.get(selectors.saveButton).click();
});

When("admin create voucher with discount {string}", (discount) => {
  cy.get(selectors.addButton).click();

  const dynamicCode = `DISC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  cy.wrap(dynamicCode).as("currentVoucher"); // Daftarkan alias

  fillVoucherForm({
    nama: "Voucher Test Diskon",
    kode: dynamicCode,
    jenis: "Nominal (Rp)",
    deskripsi: "Testing EQP/BVA Nilai Diskon",
    tanggalMulai: "2026-12-30",
    tanggal: "2026-12-31",
  });

  cy.get(selectors.valueInput).clear();

  if (discount.length > 0) {
    cy.get(selectors.valueInput)
      .invoke("removeAttr", "onkeydown")
      .invoke("attr", "type", "text")
      .type(discount, { force: true });
  }

  cy.get(selectors.saveButton).click();
});

Then("system should show error {string}", (errorMessage) => {
  cy.verifyNotification(errorMessage);
});
