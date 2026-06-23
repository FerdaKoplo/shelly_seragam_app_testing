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

  # TC-ADM002-E: Hapus pegawai (Target: ahmad.fauzi)
  Scenario: Admin berhasil menghapus akun pegawai
    Given admin sudah login dan berada di halaman manage pegawai
    When admin mengisi kolom pencarian dengan kata kunci "Dewi Kusuma"
    And admin menekan tombol filter
    When admin mengklik tombol hapus pada pegawai pertama
    And admin mengkonfirmasi penghapusan
    Then pegawai berhasil dihapus dari daftar

  # TC-ADM002-B-EQP-01 (Positive)
  Scenario: Admin menambahkan pegawai dengan password valid (memenuhi semua kriteria)
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Dewi Kusuma" username "dewi.kusuma" dan password "Pegawai123!"
    And admin mengklik tombol simpan
    Then pegawai baru "dewi.kusuma" muncul di daftar pegawai

  # TC-ADM002-B-EQP-02 (Negative - Tanpa huruf besar)
  Scenario: Admin gagal menambahkan pegawai karena password tidak mengandung huruf besar
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Password Test" username "passwordtest1" dan password "pegawai123!"
    And admin mengklik tombol simpan
    Then sistem menampilkan pesan error "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial (@$!%*#?&)."

  # TC-ADM002-B-EQP-03 (Negative - Tanpa huruf kecil)
  Scenario: Admin gagal menambahkan pegawai karena password tidak mengandung huruf kecil
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Password Test" username "passwordtest2" dan password "PEGAWAI123!"
    And admin mengklik tombol simpan
    Then sistem menampilkan pesan error "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial (@$!%*#?&)."

  # TC-ADM002-B-EQP-04 (Negative - Tanpa angka)
  Scenario: Admin gagal menambahkan pegawai karena password tidak mengandung angka
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Password Test" username "passwordtest3" dan password "Pegawai!@#"
    And admin mengklik tombol simpan
    Then sistem menampilkan pesan error "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial (@$!%*#?&)."

  # TC-ADM002-B-EQP-05 (Negative - Tanpa karakter spesial)
  Scenario: Admin gagal menambahkan pegawai karena password tidak mengandung karakter spesial
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Password Test" username "passwordtest4" dan password "Pegawai123"
    And admin mengklik tombol simpan
    Then sistem menampilkan pesan error "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial (@$!%*#?&)."

  # TC-ADM002-B-BVA-01 (Negative - 7 Karakter)
  Scenario: Admin gagal menambahkan pegawai karena password kurang dari 8 karakter
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Password Test" username "passwordtest5" dan password "Pwd123!"
    And admin mengklik tombol simpan
    Then sistem menampilkan pesan error "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial (@$!%*#?&)."

  # TC-ADM002-B-BVA-02 (Positive - 8 Karakter)
  Scenario: Admin menambahkan pegawai dengan password minimal 8 karakter
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Fitri Ana" username "fitri.ana" dan password "Pwd123!!"
    And admin mengklik tombol simpan
    Then pegawai baru "fitri.ana" muncul di daftar pegawai

  # TC-ADM002-B-BVA-03 (Negative - 21 Karakter)
  Scenario: Admin gagal menambahkan pegawai karena password lebih dari 20 karakter
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Pegawai Test" username "pegawaitest6" dan password "Pegawai123!@#$%^&*??!"
    And admin mengklik tombol simpan
    Then sistem menampilkan pesan error "Password tidak boleh lebih dari 20 karakter."

  # TC-ADM002-B-BVA-04 (Positive - 20 Karakter)
  Scenario: Admin menambahkan pegawai dengan password maksimal 20 karakter
    Given admin sudah login dan berada di halaman manage pegawai
    When admin membuka form tambah pegawai
    And admin mengisi form pegawai dengan nama "Rani Putri" username "rani.putri" dan password "Pegawai123!@#$%^&*?"
    And admin mengklik tombol simpan
    Then pegawai baru "rani.putri" muncul di daftar pegawai