Feature: TC-ADM003 Management Produk Katalog

  # TC-ADM003-A
  Scenario: Admin melihat dan mencari item di manage katalog
    Given admin berada di halaman login
    When admin login dengan username "admin" dan password "admin"
    Then admin diarahkan ke halaman dashboard
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengisi search dengan kata kunci "kemeja"
    When admin memilih filter kategori "Seragam Kantor"
   

  # TC-ADM003-B
  Scenario: Admin menambah katalog baru
    Given admin berada di halaman login
    When admin login dengan username "admin" dan password "admin"
    Then admin diarahkan ke halaman dashboard
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengklik tombol tambahkan produk baru
    Then admin diarahkan ke halaman create produk
    When admin mengisi form produk baru dengan data valid
    And admin mengklik tombol tambahkan produk
    Then admin diarahkan kembali ke halaman manage katalog
    And produk baru muncul di halaman manage katalog

  # TC-ADM003-C
  Scenario: Admin mengupdate katalog yang sudah ada
    Given admin berada di halaman login
    When admin login dengan username "admin" dan password "admin"
    Then admin diarahkan ke halaman dashboard
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengklik tombol edit pada salah satu produk
    Then admin diarahkan ke halaman edit produk
    When admin mengubah data produk dengan data baru
    And admin mengklik tombol simpan perubahan
    Then admin diarahkan kembali ke halaman manage katalog
    And data produk berhasil diperbarui

  # TC-ADM003-D
  Scenario: Admin mengarsip katalog yang sudah ada
    Given admin berada di halaman login
    When admin login dengan username "admin" dan password "admin"
    Then admin diarahkan ke halaman dashboard
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin mengklik tombol arsipkan pada salah satu produk
    Then produk tidak muncul lagi di halaman manage katalog
    When admin memilih filter status "archived"
    Then produk yang diarsipkan muncul di daftar arsip

  # TC-ADM003-E
  Scenario: Admin melihat katalog yang diarsipkan dan melakukan restore
    Given admin berada di halaman login
    When admin login dengan username "admin" dan password "admin"
    Then admin diarahkan ke halaman dashboard
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin memilih filter status "archived"
    Then halaman katalog menampilkan produk yang diarsipkan
    When admin mengklik tombol pulihkan pada salah satu produk
    Then produk kembali muncul di halaman manage katalog

  # TC-ADM003-F
  Scenario: Admin menghapus katalog yang diarsipkan
    Given admin berada di halaman login
    When admin login dengan username "admin" dan password "admin"
    Then admin diarahkan ke halaman dashboard
    When admin navigasi ke halaman manage katalog
    Then admin diarahkan ke halaman manage katalog
    When admin memilih filter status "archived"
    Then halaman katalog menampilkan produk yang diarsipkan
    When admin mengklik tombol hapus pada salah satu produk
    Then produk dihapus permanen dan tidak muncul di halaman manapun