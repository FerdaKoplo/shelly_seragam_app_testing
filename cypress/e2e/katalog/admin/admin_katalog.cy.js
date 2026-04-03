import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ─── SHARED STEPS ───────────────────────────────────────────────────────────

Given("admin berada di halaman login", () => {
  cy.visit("/login");
});

When("admin login dengan username {string} dan password {string}", (username, password) => {
  cy.get(':nth-child(1) > .flex > .flex-1').type(username);
  cy.get("#passwordInput").type(password);
  cy.get('button[type="submit"]').first().click();
});

Then("admin diarahkan ke halaman dashboard", () => {
  cy.url().should("include", "/admin/manage-transaksi");
});

When("admin navigasi ke halaman manage katalog", () => {
  cy.visit("/admin/manage-katalog");
});

Then("admin diarahkan ke halaman manage katalog", () => {
  cy.url().should("include", "/admin/manage-katalog");
});

Then("admin diarahkan kembali ke halaman manage katalog", () => {
  cy.url().should("include", "/admin/manage-katalog");
});

// ─── TC-ADM003-A : Search & Filter ──────────────────────────────────────────

When("admin mengisi search dengan kata kunci {string}", (keyword) => {
  cy.get('.flex-1 > .w-full').clear().type(keyword).type("{enter}");
});

// Then("halaman katalog menampilkan produk yang mengandung {string}", (keyword) => {
//   cy.get('.produk-card').each(($el) => {
//     cy.wrap($el).invoke("text").should("match", new RegExp(keyword, "i"));
//   });
// });

When("admin memilih filter kategori {string}", (kategori) => {
  // 1. Open filter modal
  cy.get('button').filter(':has(svg)').first().click();

  // 2. Wait for modal
  cy.contains("Filter Katalog").should("be.visible");

  // 3. Select kategori - target the select directly inside modal
  cy.contains("Kategori")
    .siblings()
    .find("select, [role='combobox']")
    .select(kategori);

  // 4. Click Terapkan
  cy.contains("Terapkan").click();
});

When("admin memilih filter status {string}", (status) => {
  // 1. Open filter modal
  cy.get('button').filter(':has(svg)').first().click();

  // 2. Wait for modal
  cy.contains("Filter Katalog").should("be.visible");

  // 3. Select Status Stok - target the select directly
  cy.contains("Status Stok")
    .siblings()
    .find("select, [role='combobox']")
    .select(status);

  // 4. Click Terapkan
  cy.contains("Terapkan").click();
});
// ─── TC-ADM003-B : Tambah Produk ────────────────────────────────────────────

When("admin mengklik tombol tambahkan produk baru", () => {
  cy.contains("Tambahkan Produk Baru").click();
});

Then("admin diarahkan ke halaman create produk", () => {
  cy.url().should("include", "/admin/manage-katalog/create");
  cy.intercept('POST', '/admin/manage-katalog').as('storeProduct');
});

When("admin mengisi form produk baru dengan data valid", () => {

  cy.get('.gap-2 > .relative > .w-full').type("test deskripsi");
  cy.get('.gap-2 > :nth-child(2) > .w-full').type("Seragam Kantor");
  cy.get('input[name="nama_produk"]').type("Kemeja Putih Test");
  cy.get('input[name="harga"]').type("150000");
  cy.get('input[name="stok"]').type("10");

  // Upload image
  cy.get('input[name="fotos[]"]').selectFile(
    "cypress/fixtures/test.jpg",
    { force: true }
  );

  // ── Ukuran modal ──
  cy.contains("Tambahkan Variasi Ukuran").click();
  cy.contains("button", "L").click({ force: true });
  cy.contains("button", "Simpan").click({ force: true });
  cy.wait(500);

  // ── Warna modal ──
  cy.contains("Tambahkan Variasi Warna").click({ force: true });
  cy.contains("h3", "Warna").should("be.visible");
  cy.get('[style="background-color: #261C1A"]').click({ force: true });
  cy.get('.mt-6 > .w-full').click({ force: true });
});

When("admin mengklik tombol tambahkan produk", () => {
  cy.get('#submitProduk').click();
  // cy.contains("Tambahkan Produk").click();
});

Then("produk baru muncul di halaman manage katalog", () => {
  cy.get('.flex-1 > .w-full').type("Kemeja Putih Test").type("{enter}");
  cy.contains("Kemeja Putih Test").should("be.visible");
});

// ─── TC-ADM003-C : Update Produk ────────────────────────────────────────────

When("admin mengklik tombol edit pada salah satu produk", () => {
  cy.get('[data-action="edit"]').first().click();
});

Then("admin diarahkan ke halaman edit produk", () => {
  cy.url().should("match", /\/admin\/manage-katalog\/\d+\/edit/);
});

When("admin mengubah data produk dengan data baru", () => {
  cy.get('input[name="nama_produk"]').clear().type("Kemeja Updated");
  cy.get('input[name="harga"]').clear().type("200000");
  cy.get('input[name="stok"]').clear().type("20");
  cy.get('textarea[name="deskripsi"]').clear().type("Deskripsi updated");
  cy.get('input[name="kategori"]').clear().type("seragam kantor");
});

When("admin mengklik tombol simpan perubahan", () => {
  cy.contains("Simpan Perubahan").click();
});

Then("data produk berhasil diperbarui", () => {
  cy.contains("Produk berhasil diperbarui").should("be.visible");
});

// ─── TC-ADM003-D : Arsip Produk ─────────────────────────────────────────────

When("admin mengklik tombol arsipkan pada salah satu produk", () => {
  cy.get('[data-action="archive"]').first().click();
});

Then("produk tidak muncul lagi di halaman manage katalog", () => {
  cy.contains("Produk berhasil diarsipkan").should("be.visible");
});

When("admin memilih filter status {string}", (status) => {
  cy.get('select[name="filter_status"]').select(status);
  cy.get('button[type="submit"]').click();
});

Then("produk yang diarsipkan muncul di daftar arsip", () => {
  cy.get('.produk-card').should("have.length.greaterThan", 0);
});

// ─── TC-ADM003-E : Restore Produk ───────────────────────────────────────────

Then("halaman katalog menampilkan produk yang diarsipkan", () => {
  cy.get('.produk-card').should("have.length.greaterThan", 0);
});

When("admin mengklik tombol pulihkan pada salah satu produk", () => {
  cy.get('[data-action="restore"]').first().click();
});

Then("produk kembali muncul di halaman manage katalog", () => {
  cy.contains("Produk dipulihkan").should("be.visible");
});

// ─── TC-ADM003-F : Hapus Produk ─────────────────────────────────────────────

When("admin mengklik tombol hapus pada salah satu produk", () => {
  cy.get('[data-action="delete"]').first().click();
});

Then("produk dihapus permanen dan tidak muncul di halaman manapun", () => {
  cy.contains("Produk berhasil dihapus").should("be.visible");
});