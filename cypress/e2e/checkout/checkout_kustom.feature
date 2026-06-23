Feature: Checkout Produk Kustom

  # Happy path: kustom config (produk_kustom.cy.js / kustom_flow_shared.js)
  # + checkout form (checkout_katalog.cy.js)
  Scenario: TC-CUS006-KUSTOM - Customer berhasil checkout produk kustom
    Given Customer memiliki konfigurasi produk kustom siap checkout
    When Customer membuka halaman checkout
    Then Customer berada di halaman checkout kustom
    And Ringkasan pesanan kustom tampil
    When Customer mengisi data checkout kustom yang valid
    And Customer memilih tujuan pengiriman
    And Customer memilih opsi pengiriman
    And Customer klik tombol buat pesanan
    Then Sistem menampilkan notifikasi pesanan berhasil
