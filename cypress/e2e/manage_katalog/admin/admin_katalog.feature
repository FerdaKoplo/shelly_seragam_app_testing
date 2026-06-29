Feature: TC-ADM003 Management Produk Katalog

  # TC-ADM003-A
  Scenario: Admin melihat dan mencari item di manage katalog
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengisi search dengan kata kunci "Kemeja"
    When admin memilih filter kategori "Atasan"

  # TC-ADM003-B
  Scenario: Admin menambah katalog baru
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    Then admin diarahkan ke halaman create produk
    When admin mengisi form produk baru dengan data valid
    When admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat pop up produk katalog berhasil ditambahkan
    When admin mengisi search dengan kata kunci "Kemeja Putih Formal Pria"
    And produk baru muncul di halaman manage katalog

  # TC-ADM003-C
  Scenario: Admin mengupdate katalog yang sudah ada
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin memilih filter status "active"
    When admin mengklik tombol edit pada salah satu produk
    Then admin diarahkan ke halaman edit produk
    When admin mengubah data produk dengan data baru
    And admin mengklik tombol simpan perubahan
    Then admin diarahkan kembali ke halaman manage katalog
    And admin memverifikasi data produk berhasil diperbarui

  # TC-ADM003-D
  Scenario: Admin mengarsip katalog yang sudah ada
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin memilih filter status "active"
    When admin mengklik tombol arsipkan pada salah satu produk
    Then produk tidak muncul lagi di halaman manage katalog
    When admin memilih filter status "archived"
    Then produk yang diarsipkan muncul di daftar arsip

  # TC-ADM003-E
  Scenario: Admin melihat katalog yang diarsipkan dan melakukan restore
    When admin navigasi ke halaman manage katalog
    When admin diarahkan ke halaman manage katalog
    When admin memilih filter status "active"
    When admin mengklik tombol arsipkan pada salah satu produk
    Then produk tidak muncul lagi di halaman manage katalog
    When admin memilih filter status "archived"
    Then halaman katalog menampilkan produk yang diarsipkan
    When admin mengklik tombol pulihkan pada salah satu produk
    Then produk kembali muncul di halaman manage katalog

  # TC-ADM003-F
  Scenario: Admin menghapus katalog yang diarsipkan
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengklik tombol arsipkan pada salah satu produk
    Then produk tidak muncul lagi di halaman manage katalog
    When admin memilih filter status "archived"
    Then admin diarahkan ke halaman manage katalog
    When admin memilih filter status "archived"
    Then halaman katalog menampilkan produk yang diarsipkan
    When admin mengklik tombol hapus pada salah satu produk
    Then produk dihapus permanen dan tidak muncul di halaman manapun

  # TC-ADM003-B-EQP-01
  Scenario: Admin gagal menambah katalog dengan harga di bawah batas minimum (< 10.000)
    When admin navigasi ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    When admin mengisi form produk dengan harga "9999"
    And admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat notifikasi error validasi "Harga minimal adalah Rp 10.000"

  # TC-ADM003-B-EQP-02
  Scenario: Admin berhasil menambah katalog dengan harga di batas bawah (= 10.000)
    When admin navigasi ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    When admin mengisi form produk dengan harga "10000"
    And admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat pop up produk katalog berhasil ditambahkan

  # TC-ADM003-B-EQP-03
  Scenario: Admin berhasil menambah katalog dengan harga normal (10.000 - 5.000.000)
    When admin navigasi ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    When admin mengisi form produk dengan harga "150000"
    And admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat pop up produk katalog berhasil ditambahkan

  # TC-ADM003-B-EQP-04
  Scenario: Admin berhasil menambah katalog dengan harga di batas atas (= 5.000.000)
    When admin navigasi ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    When admin mengisi form produk dengan harga "5000000"
    And admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat pop up produk katalog berhasil ditambahkan

  # TC-ADM003-B-EQP-05
  Scenario: Admin gagal menambah katalog dengan harga di atas batas maksimal (> 5.000.000)
    When admin navigasi ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    When admin mengisi form produk dengan harga "5000001"
    And admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat notifikasi error validasi "Harga maksimal adalah Rp 5.000.000"

  # TC-ADM003-B-EQP-06
  Scenario: Admin gagal menambah katalog dengan harga negatif
    When admin navigasi ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    When admin mengisi form produk dengan harga "-10000"
    And admin menambahkan variasi ukuran
    And admin mengklik tombol tambahkan produk
    Then admin melihat notifikasi error validasi "Harga minimal adalah Rp 10.000"



