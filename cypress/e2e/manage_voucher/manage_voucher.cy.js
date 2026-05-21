import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  const selectors = {
    page: '[data-cy=voucher-page]',
    addButton: '[data-cy=btn-tambah-voucher-baru]',
    saveButton: '[data-cy=btn-submit-voucher]',
    searchInput: '[data-cy=voucher-search-input]',
  
    nameInput: '[data-cy=voucher-name-input]',
    codeInput: '[data-cy=voucher-code-input]',
    typeSelect: '[data-cy=voucher-type-select]',
    valueInput: '[data-cy=voucher-discount-input]',
    descInput: '[data-cy=voucher-description-input]',
    startInput: '[data-cy=voucher-start-date-input]',
    expiredInput: '[data-cy=voucher-end-date-input]',
  
    voucherRow: '[data-cy=voucher-grid]',
  };
  
  const voucherData = {
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
  };
  
  const fillVoucherForm = (data) => {
    if (data.nama !== undefined) {
      cy.get(selectors.nameInput)
        .clear()
        .type(data.nama);
    }
  
    if (data.kode !== undefined) {
      cy.get(selectors.codeInput)
        .clear()
        .type(data.kode);
    }
  
    if (data.jenis !== undefined) {
      cy.get(selectors.typeSelect)
        .select(data.jenis);
    }
  
    if (data.nilai !== undefined) {
      cy.get(selectors.valueInput)
        .clear()
        .type(data.nilai);
    }
    if (data.deskripsi !== undefined) {
        cy.get(selectors.descInput)
          .clear()
          .type(data.deskripsi);
      }
      if (data.tanggalMulai !== undefined) {
        cy.get(selectors.startInput)
          .clear()
          .type(data.tanggalMulai);
      }

    if (data.tanggal !== undefined) {
      cy.get(selectors.expiredInput)
        .clear()
        .type(data.tanggal);
    }
  };
  
  Given("admin already logged in", () => {
    cy.loginAdmin();
  });
  
  Given("admin open voucher management page", () => {
    cy.visit("/admin/manage-voucher");
  
    cy.get(selectors.page)
      .should("exist");
  });
  
  Given("there should be a voucher with PROMOSELLER code", () => {
   // 1. Search for 'PROMOSELLER' using Cypress search bar to be sure, or check the grid
  cy.get('body').then(($body) => {
    
    // Check if the code text exists anywhere inside your voucher grid
    if ($body.find(`${selectors.voucherRow}:contains("PROMOSELLER")`).length > 0) {
      
      // Case A: It exists! Log a message and do nothing (Passes the step)
      cy.log("Voucher 'PROMOSELLER' already exists. Skipping creation.");
      
    } else {
      
      // Case B: It doesn't exist. Let's create it!
      cy.log("Voucher 'PROMOSELLER' not found. Creating it now...");
      
      cy.get(selectors.addButton).click();
      
      fillVoucherForm(voucherData.duplicate);
      
      cy.get(selectors.saveButton).click();
      
      // Optional: Verify notification success to ensure it's safely created before continuing
      cy.verifyNotification("Voucher Berhasil Ditambahkan");
    }
  });
  });
  

  When("admin add voucher with valid data", () => {
    cy.get(selectors.addButton).click();
  
    fillVoucherForm(voucherData.valid);
  
    // cy.intercept("POST", "/admin/voucher")
    //   .as("createVoucher");
  
    cy.get(selectors.saveButton).click();
  
    // cy.wait("@createVoucher");
  });
  
  Then("voucher successfully saved", () => {
    cy.verifyNotification("Voucher Berhasil Ditambahkan");
  
    cy.contains(
      selectors.voucherRow,
      voucherData.valid.kode
    ).should("exist");
  });
  
  When("admin add voucher with duplicate code", () => {
    cy.get(selectors.addButton).click();
  
    fillVoucherForm(voucherData.duplicate);
  
    cy.get(selectors.saveButton).click();
  });
  
  Then("system should show duplicate code error", () => {

    cy.verifyNotification("Voucher Dengan Kode Yang Sama Sudah Dibuat");
    
  });
  
  When("admin update voucher value", () => {
    cy.contains(
      selectors.voucherRow,
      "PROMOSELLER"
    )
      .find('[data-cy=btn-edit-voucher]')
      .first()
      .click();
  
    cy.get(selectors.valueInput)
      .clear()
      .type("20000");
  
    cy.get(selectors.saveButton).click();
  });
  
  Then("voucher successfully updated", () => {
    cy.verifyNotification("Voucher Berhasil Diperbarui");
  });
  
  When("admin delete voucher", () => {
    cy.acceptConfirm();
  
    cy.contains(
      selectors.voucherRow,
      "PROMOSELLER"
    )
      .find('[data-cy=btn-delete-voucher]').first()
      .click();
  });
  
  Then("voucher successfully deleted", () => {
    cy.verifyNotification("Voucher Berhasil Dihapus");
  
    cy.contains(
      selectors.voucherRow,
      "PROMOSELLER"
    ).should("not.exist");
  });
  
  When("admin add voucher without code", () => {
    cy.get(selectors.addButton).click();
  
    fillVoucherForm({
      nama: "Auto Voucher",
      jenis: "Nominal (Rp)",
      deskripsi: "voucher valid",
      tanggalMulai: "2026-12-30",
      tanggal: "2026-12-31",
      nilai: "10000",
    });
  
    cy.get(selectors.saveButton).click();
    cy.verifyNotification("Voucher Berhasil Ditambahkan");
  
  });
  
  Then("system should generate voucher code", () => {

    cy.contains(
      selectors.voucherRow,
      "Auto Voucher"
    )
      .find('[data-cy=voucher-code]')
      .invoke("text")
      .should("not.be.empty");
  });
  
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
    cy.verifyNotification("The tanggal mulai field must be a date after or equal to today");
  });
  
  When("admin submit empty voucher form", () => {
    cy.get(selectors.addButton).click();
  
    cy.get(selectors.saveButton).click();
  });
  
  Then("required validation should appear", () => {
    cy.get("input:invalid")
      .should("have.length.at.least", 1);
  });
  
  When("admin create percentage voucher", () => {
    cy.get(selectors.addButton).click();
  
    fillVoucherForm(voucherData.percentage);
  
    cy.get(selectors.saveButton).click();
  });
  
  Then("percentage voucher successfully saved", () => {
    cy.verifyNotification("Voucher Berhasil Ditambahkan");
  });
  
  When("admin input negative discount value", () => {
    cy.get(selectors.addButton).click();
  
    cy.get(selectors.valueInput)
      .type("-");
  });
  
  Then("negative value should be rejected", () => {
    cy.get(selectors.valueInput)
      .should("have.value", "");
  });
  
  When("admin search voucher {string}", (search) => {
    cy.get(selectors.searchInput)
    .clear()
    .type(`${search}{enter}`);
  });
  
  Then("matching voucher {string} should appear", (search) => {
    cy.contains(
      selectors.voucherRow,
      search
    ).should("exist");
  });