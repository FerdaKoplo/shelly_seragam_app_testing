Feature: TC-ADM002 Management Data Pegawai (Admin)

  # TC-ADM002-A: Melihat daftar pegawai
  Scenario: Admin melihat daftar seluruh pegawai
    Given admin sudah login dan berada di halaman manage pegawai
    Then admin dapat melihat tabel daftar pegawai

  # TC-ADM002-B: Menambah pegawai baru (Data: Dewi Kusuma)
  Scenario: Admin berhasil menambahkan pegawai baru
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Dewi Kusuma" username "dewi.kusuma" dan password "Pegawai@2026!"
    And admin mengklik tombol simpan
    Then pegawai baru "dewi.kusuma" muncul di daftar pegawai

  # TC-ADM002-A-SEARCH: Mencari pegawai (Kata kunci: Dewi)
  Scenario: Admin mencari pegawai berdasarkan kata kunci
    Given admin sudah login dan berada di halaman manage pegawai
    When admin mengisi kolom pencarian dengan kata kunci "Dewi"
    And admin menekan tombol filter
    Then tabel menampilkan pegawai yang mengandung kata kunci "Dewi"

  # TC-ADM002-A-SEARCH: Filter pegawai berdasarkan status
  Scenario: Admin memfilter pegawai berdasarkan status
    Given admin sudah login dan berada di halaman manage pegawai
    When admin memilih filter status pegawai "Aktif"
    And admin menekan tombol filter
    Then tabel hanya menampilkan pegawai dengan status "Active"

  # TC-ADM002-B-NEG: Menambah pegawai dengan form tidak lengkap
  Scenario: Admin gagal menambahkan pegawai karena form tidak lengkap
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengklik tombol simpan tanpa mengisi form
    Then sistem menampilkan validasi form pegawai

  # TC-ADM002-C: Update data pegawai (Data: Budi Santoso Wijaya)
  Scenario: Admin berhasil mengupdate data pegawai
    Given admin sudah login dan berada di halaman manage pegawai
    And terdapat data pegawai di dalam daftar
    When admin mengklik tombol edit pada pegawai pertama
    And admin mengubah nama pegawai menjadi "Budi Santoso Wijaya"
    And admin mengklik tombol simpan
    Then data pegawai berhasil diperbarui di daftar

  # TC-ADM002-D: Mengubah status pegawai (Target: ahmad.fauzi)
  Scenario: Admin berhasil mengubah status pegawai menjadi non-aktif
    Given admin sudah login dan berada di halaman manage pegawai
    When admin mengisi kolom pencarian dengan kata kunci "ahmad.fauzi"
    And admin menekan tombol filter
    When admin mengklik tombol edit pada pegawai pertama
    And admin mengubah status pegawai menjadi "non-aktif"
    And admin mengklik tombol simpan
    Then status pegawai berhasil diperbarui

  # TC-ADM002-E: Hapus pegawai (Target: temp_pegawai)
  Scenario: Admin berhasil menghapus akun pegawai
    Given admin sudah login dan berada di halaman manage pegawai
    When admin mengisi kolom pencarian dengan kata kunci "temp_pegawai"
    And admin menekan tombol filter
    When admin mengklik tombol hapus pada pegawai pertama
    And admin mengkonfirmasi penghapusan
    Then pegawai berhasil dihapus dari daftar