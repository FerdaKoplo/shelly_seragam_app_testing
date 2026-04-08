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
    When pegawai mengklik tombol edit pada produk
    Then pegawai diarahkan ke halaman edit produk
    When pegawai mengubah data produk
    And pegawai mengklik tombol simpan perubahan
    Then pegawai memverifikasi data produk berhasil diperbarui