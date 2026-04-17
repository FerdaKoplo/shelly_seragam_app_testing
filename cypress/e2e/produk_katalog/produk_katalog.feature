Feature: Katalog Produk

  @TC-CUS002
  Scenario: Verifikasi akses halaman katalog dan pencarian dasar
    Given User membuka halaman katalog
    When User mencari produk dengan keyword "Kemeja"
    Then Produk yang relevan ditampilkan

  @TC-CUS002-EP-01
  Scenario: Search keyword ditemukan
    Given User membuka halaman katalog
    When User mencari produk dengan keyword "Kemeja"
    Then Produk yang relevan ditampilkan

  @TC-CUS002-EP-02
  Scenario: Search keyword tidak ditemukan
    Given User membuka halaman katalog
    When User mencari produk dengan keyword "produk bebas"
    Then Empty state ditampilkan

  @TC-CUS002-BVA-01
  Scenario: Search kosong
    Given User membuka halaman katalog
    When User mencari produk dengan keyword " "
    Then Semua produk ditampilkan

  @TC-CUS002-EP-03
  Scenario: Search karakter aneh
    Given User membuka halaman katalog
    When User mencari produk dengan keyword "@@@###"
    Then Empty state ditampilkan

  @TC-CUS002-EP-04
  Scenario: Filter kategori valid
    Given User membuka halaman katalog
    When User memfilter kategori "atasan"
    Then Produk kategori tersebut ditampilkan

  @TC-CUS002-EP-06
  Scenario: Filter kategori invalid via URL
    When User membuka katalog dengan kategori invalid
    Then Empty state ditampilkan

  @TC-CUS002-EP-07
  Scenario: Filter stok ready
    Given User membuka halaman katalog
    When User memfilter stok "ready"
    Then Produk dengan stok ready ditampilkan

  @TC-CUS002-EP-08
  Scenario: Filter stok empty
    Given User membuka halaman katalog
    When User memfilter stok "empty"
    Then Empty state ditampilkan