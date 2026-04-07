import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ─── Shared Setup ─────────────────────────────────────────────────────────────

Given("admin sudah login dan berada di halaman manage pegawai", () => {
  cy.loginAdmin();
  cy.visit("/admin/manage-pegawai");
  cy.url().should("include", "/admin/manage-pegawai");
});

Given("terdapat data pegawai di dalam daftar", () => {
  cy.get("tbody tr").should("have.length.greaterThan", 0);
});

// ─── TC-ADM002-A : Melihat daftar pegawai ────────────────────────────────────

Then("admin dapat melihat tabel daftar pegawai", () => {
  cy.get("table").should("be.visible");
  cy.get("thead").contains("Nama").should("be.visible");
  cy.get("thead").contains("Username").should("be.visible");
  cy.get("thead").contains("Status").should("be.visible");
});



// ─── TC-ADM002-B : Tambah pegawai ────────────────────────────────────────────

When("admin membuka form tambah pegawai", () => {
  cy.contains("Tambah Pegawai").click();
  cy.get('input[name="nama"]').should("be.visible");
});

When(
  "admin mengisi form pegawai dengan nama {string} username {string} dan password {string}",
  (nama, username, password) => {
    cy.get('input[name="nama"]').clear().type(nama);
    cy.get('input[name="username"]').clear().type(username);
    cy.get('input[name="password"]').clear().type(password);
  }
);

When("admin mengklik tombol simpan", () => {
  cy.contains("Simpan").click();
});

Then("pegawai baru {string} muncul di daftar pegawai", (username) => {
  cy.get("tbody").contains(username).should("be.visible");
});

When("admin mengklik tombol simpan tanpa mengisi form", () => {
  cy.contains("Simpan").click();
});

Then("sistem menampilkan validasi form pegawai", () => {
  cy.get('#notificationOverlay > .relative').should('be.visible') // overlay is visible
  cy.dismissConfirm();
});

// ─── TC-ADM002-A-SEARCH : Cari & Filter pegawai ──────────────────────────────
When("admin mengisi kolom pencarian dengan kata kunci {string}", (keyword) => {
  cy.get('input[name="search"]').clear().type(keyword);
});

When("admin memilih filter status pegawai {string}", (status) => {
  cy.get('select[name="status"]').select(status);
});

When("admin menekan tombol filter", () => {
  cy.get('#submitFilter').click();
});

Then("tabel menampilkan pegawai yang mengandung kata kunci {string}", (keyword) => {
  cy.get("tbody tr").each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .should("match", new RegExp(keyword, "i"));
  });
});

Then("tabel hanya menampilkan pegawai dengan status {string}", (status) => {
  cy.get("tbody tr").each(($row) => {
    cy.wrap($row).find("td").eq(2).invoke("text").then((text) => {
      expect(text.trim().toLowerCase()).to.equal(status.toLowerCase());
    });
  });
});

// ─── TC-ADM002-C : Update data pegawai ───────────────────────────────────────

When("admin mengklik tombol edit pada pegawai pertama", () => {
  cy.get("tbody tr").first().contains("Edit").click();
  cy.get('input[name="nama"]').should("be.visible");
});

When("admin mengubah nama pegawai menjadi {string}", (namaBaru) => {
  cy.get('input[name="nama"]').clear().type(namaBaru);
});

Then("data pegawai berhasil diperbarui di daftar", () => {
  cy.get("tbody").should("be.visible");
  // Redirect back to list after save
  cy.url().should("include", "/admin/manage-pegawai");
});

// ─── TC-ADM002-D : Ubah status pegawai ───────────────────────────────────────
When("admin mengubah status pegawai menjadi {string}", (status) => {
  if (status === "non-aktif") {
    cy.contains("button", "Non Aktif").click();
  } else {
    cy.contains("button", "Aktif").click();
  }
});

Then("status pegawai berhasil diperbarui", () => {
  cy.url().should("include", "/admin/manage-pegawai");
  cy.get("tbody tr").first().find("td").eq(2).invoke("text").should("not.be.empty");
});

// ─── TC-ADM002-E : Hapus pegawai ─────────────────────────────────────────────

When("admin mengklik tombol hapus pada pegawai pertama", () => {
  cy.get("tbody tr")
    .first()
    .find("td")
    .last()
    .find('button[type="submit"]')
    .click();
});

When("admin mengkonfirmasi penghapusan", () => {
  cy.acceptConfirm();
});

Then("pegawai berhasil dihapus dari daftar", () => {
  cy.url().should("include", "/admin/manage-pegawai");
  cy.get("tbody").should("not.contain", "temp_pegawai");
});
