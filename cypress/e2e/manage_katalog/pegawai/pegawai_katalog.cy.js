import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ─── Navigation ─────────────────────────────────────────

When("pegawai navigasi ke halaman katalog", () => {
  cy.loginPegawai();
  cy.visit("/admin/manage-katalog"); 
});

Then("pegawai diarahkan ke halaman katalog", () => {
  cy.url().should("include", "/admin/manage-katalog");
});

// ─── Search & Filter ───────────────────────────────────

When("pegawai mengisi search dengan kata kunci {string}", (keyword) => {
  cy.get("#searchInput").clear().type(keyword).type("{enter}");
});

When("pegawai memilih filter kategori {string}", (kategori) => {
  cy.get("#btn-filter-katalog").click();
  cy.contains("Filter Katalog").should("be.visible");

  cy.contains("Kategori")
    .siblings()
    .find("select")
    .select(kategori);

  cy.contains("Terapkan").click();
});

// ─── Tambah Produk ─────────────────────────────────────

When("pegawai mengklik tombol buat item baru", () => {
  cy.get("#btn-tambah-produk-baru").click();
});

Then("pegawai diarahkan ke halaman create produk", () => {
  cy.url().should("include", "/admin/manage-katalog/create");
});

When("pegawai mengisi form produk baru dengan data valid", () => {
  cy.get('input[name="nama_produk"]').type("Celana Panjang Formal Pria");
  cy.get('input[name="harga"]').type("120000");
  cy.get('input[name="stok"]').type("30");
  cy.get('textarea[name="deskripsi"]').type("Celana formal pria bahan premium.");
  cy.get('input[name="kategori"]').type("Celana");
});

When("pegawai mengklik tombol simpan produk", () => {
  cy.get("#submitProduk").click();
});

Then("pegawai melihat notifikasi produk berhasil ditambahkan", () => {
  cy.get('#notificationOverlay > .relative').should('be.visible');
  cy.contains("Produk berhasil ditambahkan").should("be.visible");
  cy.get('#btnDismiss').click();
});

Then("produk baru muncul di halaman katalog", () => {
  cy.contains("Celana Panjang Formal Pria").should("be.visible");
});

// ─── Update Produk ─────────────────────────────────────

When("pegawai mengklik tombol edit pada produk", () => {
  cy.get("#searchInput").clear().type("Celana").type("{enter}");
  cy.get('[data-cy="produk-card"]')
    .contains("Celana Panjang Formal Pria")
    .parents('[data-cy="produk-card"]')
    .find('[data-cy="btn-edit-produk"]')
    .click();
});

Then("pegawai diarahkan ke halaman edit produk", () => {
  cy.url().should("match", /\/admin\/manage-katalog\/\d+\/edit/);
});

When("pegawai mengubah data produk", () => {
  cy.get('input[name="harga"]').clear().type("115000");
  cy.get('input[name="nama_produk"]')
  .clear()
  .type("Celana Panjang Hitam");
  cy.get('textarea[name="deskripsi"]')
    .clear()
    .type("Celana Pendek");
});

When("pegawai mengklik tombol simpan perubahan", () => {
  cy.get("#btn-simpan-perubahan").click();
});

Then("pegawai memverifikasi data produk berhasil diperbarui", () => {
  cy.url().should("include", "/admin/manage-katalog");
  cy.verifyNotification("Produk berhasil diperbarui!");
  cy.get("#searchInput").clear().type("Celana Panjang Hitam").type("{enter}");
  cy.contains("Celana Panjang Hitam").should("be.visible");
});