Feature: Manajemen Produk Kustomisasi Admin



    # TC-ADM004-A
  Scenario: Admin melihat daftar produk kustomisasi
    Given Admin sudah login
    When Admin membuka halaman produk kustomisasi
    Then Sistem menampilkan daftar section
    And Admin dapat melihat item dalam section
    
    # TC-ADM004-B
  Scenario: Admin menambahkan produk kustomisasi
    Given Admin sudah login
    When Admin membuka halaman produk kustomisasi
    And Admin klik tombol tambah
    And Admin menambahkan aspek utama
    And Admin menyimpan data
    Then Data produk kustomisasi berhasil ditambahkan

    # TC-ADM004-C
  Scenario: Admin mengedit produk kustomisasi
    Given Admin sudah login
    When Admin membuka halaman produk kustomisasi
    And Admin klik tombol edit pada salah satu item
    And Admin mengubah konfigurasi
    And Admin menyimpan perubahan
    Then Perubahan berhasil disimpan

    # TC-ADM004-D
  Scenario: Admin menghapus produk kustomisasi
    Given Admin sudah login
    When Admin membuka halaman produk kustomisasi
    And Admin klik tombol hapus pada salah satu item
    And Admin mengkonfirmasi penghapusan
    Then Data berhasil dihapus