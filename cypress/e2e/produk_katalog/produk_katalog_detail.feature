Feature: Product Detail - Quantity Validation (BVA)

  Background:
    Given Customer membuka halaman detail produk

 Scenario: Detail produk menampilkan semua informasi dengan benar
    Then Nama produk tampil
    And Harga produk tampil
    And Stok produk tampil
    And Gambar utama tampil
    And Thumbnail tersedia
    And Size selector tersedia
    And Color selector tersedia
    And Quantity control tersedia
    And Total harga tampil
    And Tombol aksi tersedia
  
  Scenario: Customer dapat membuka dan menutup panduan ukuran
    When Customer membuka panduan ukuran
    Then Modal panduan ukuran tampil

  Scenario: Quantity minimum dapat digunakan
    Then Quantity default adalah 1
    

  Scenario: Quantity dalam rentang valid
    When Customer menambah quantity hingga 5
    Then Quantity menjadi 5
    

  Scenario: Quantity maksimum sesuai stok
    When Customer menambah quantity hingga stok maksimum
    Then Quantity sama dengan stok
    

  Scenario: Quantity tidak bisa kurang dari minimum
    When Customer mengurangi quantity di bawah 1
    Then Quantity tetap 1

  Scenario: Quantity tidak bisa melebihi stok
    When Customer menambah quantity melebihi stok
    Then Quantity tidak melebihi stok