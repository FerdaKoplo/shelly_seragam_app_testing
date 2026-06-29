Feature: TC-PGW002 Management Produk Katalog Pegawai

  # TC-PGW002-A
  Scenario: Pegawai melihat dan mencari item katalog
    When pegawai navigasi ke halaman katalog
    Then pegawai diarahkan ke halaman katalog
    When pegawai mengisi search dengan kata kunci "Celana"
    When pegawai memilih filter kategori "Celana"

  # TC-PGW002-B
  Scenario: Pegawai menambah katalog baru
    When pegawai navigasi ke halaman katalog
    Then pegawai diarahkan ke halaman katalog
    When pegawai mengklik tombol buat item baru
    Then pegawai diarahkan ke halaman create produk
    When pegawai mengisi form produk baru dengan data valid
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi produk berhasil ditambahkan
    When pegawai mengisi search dengan kata kunci "Celana Panjang Formal Pria"
    And produk baru muncul di halaman katalog

  # TC-PGW002-C
  Scenario: Pegawai mengupdate katalog
    When pegawai navigasi ke halaman katalog
    Then pegawai diarahkan ke halaman katalog
    When admin memilih filter status "active"
    When pegawai mengklik tombol edit pada produk
    Then pegawai diarahkan ke halaman edit produk
    When pegawai mengubah data produk
    And pegawai mengklik tombol simpan perubahan
    Then pegawai memverifikasi data produk berhasil diperbarui

  # TC-PGW002-B-EQP-01
  Scenario: Pegawai gagal menambah katalog dengan harga di bawah batas minimum (< 10.000)
    When pegawai navigasi ke halaman katalog
    When pegawai mengklik tombol buat item baru
    When pegawai mengisi form produk dengan harga "9999"
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi error validasi "Harga minimal adalah Rp 10.000"

  # TC-PGW002-B-EQP-02
  Scenario: Pegawai berhasil menambah katalog dengan harga di batas bawah (= 10.000)
    When pegawai navigasi ke halaman katalog
    When pegawai mengklik tombol buat item baru
    When pegawai mengisi form produk dengan harga "10000"
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi produk berhasil ditambahkan

  # TC-PGW002-B-EQP-03
  Scenario: Pegawai berhasil menambah katalog dengan harga normal (10.000 - 5.000.000)
    When pegawai navigasi ke halaman katalog
    When pegawai mengklik tombol buat item baru
    When pegawai mengisi form produk dengan harga "150000"
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi produk berhasil ditambahkan

  # TC-PGW002-B-EQP-04
  Scenario: Pegawai berhasil menambah katalog dengan harga di batas atas (= 5.000.000)
    When pegawai navigasi ke halaman katalog
    When pegawai mengklik tombol buat item baru
    When pegawai mengisi form produk dengan harga "5000000"
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi produk berhasil ditambahkan

  # TC-PGW002-B-EQP-05
  Scenario: Pegawai gagal menambah katalog dengan harga di atas batas maksimal (> 5.000.000)
    When pegawai navigasi ke halaman katalog
    When pegawai mengklik tombol buat item baru
    When pegawai mengisi form produk dengan harga "5000001"
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi error validasi "Harga maksimal adalah Rp 5.000.000"

  # TC-PGW002-B-EQP-06
  Scenario: Pegawai gagal menambah katalog dengan harga negatif
    When pegawai navigasi ke halaman katalog
    When pegawai mengklik tombol buat item baru
    When pegawai mengisi form produk dengan harga "-10000"
    And pegawai mengklik tombol simpan produk
    Then pegawai melihat notifikasi error validasi "Harga minimal adalah Rp 10.000"
