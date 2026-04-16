Feature: Manajemen Produk Kustomisasi Pegawai

    # TC-PGW003-A
  Scenario: Pegawai melihat daftar produk kustomisasi
    Given Pegawai sudah login
    When Pegawai membuka halaman produk kustomisasi
    Then Sistem menampilkan daftar section
    And Pegawai dapat melihat item dalam section
    
    # TC-PGW003-B
  Scenario: Pegawai menambahkan produk kustomisasi
    Given Pegawai sudah login
    When Pegawai membuka halaman produk kustomisasi
    And Pegawai klik tombol tambah
    And Pegawai menambahkan aspek utama
    And Pegawai menyimpan data
    Then Data produk kustomisasi berhasil ditambahkan

    # TC-PGW003-C
  Scenario: Pegawai mengedit produk kustomisasi
    Given Pegawai sudah login
    When Pegawai membuka halaman produk kustomisasi
    And Pegawai klik tombol edit pada salah satu item
    And Pegawai mengubah konfigurasi
    And Pegawai menyimpan perubahan
    Then Perubahan berhasil disimpan

    # TC-PGW003-D
  Scenario: Pegawai menghapus produk kustomisasi
    Given Pegawai sudah login
    When Pegawai membuka halaman produk kustomisasi
    And Pegawai klik tombol hapus pada salah satu item
    And Pegawai mengkonfirmasi penghapusan
    Then Data berhasil dihapus