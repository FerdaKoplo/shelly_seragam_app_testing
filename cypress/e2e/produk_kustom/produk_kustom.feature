Feature: Kustomisasi Produk Seragam

  Background:
    Given User membuka halaman kustomisasi

  # ========================
  # MAIN FLOW
  # ========================
  Scenario: TC-CUS005 - Submit form kustomisasi berhasil
    When User memilih kategori "Bundle"
    And User memilih kombinasi "2"
    And User memilih material "Standar" pada kombinasi 1
    And User memilih material "Katun" pada kombinasi 2
    And User memilih bordir "2"
    And User memilih ukuran "M"
    And User menambah quantity hingga 20
    And User upload file "logo.jpg" with size 5MB and type "image/jpeg"
    And User klik tombol checkout
    Then Sistem memproses pesanan kustom

  # ========================
  # BVA - QUANTITY
  # ========================
  Scenario: TC-CUS005-BVA-01 - Quantity minimum
    When User klik tombol minus
    Then Quantity adalah 1

  Scenario: TC-CUS005-BVA-02 - Quantity normal
    When User menambah quantity hingga 10
    Then Quantity adalah 10

  Scenario: TC-CUS005-BVA-03 - Quantity negatif
    When User mengurangi quantity di bawah 1
    Then Quantity adalah 1

  # ========================
  # BVA - FILE SIZE
  # ========================
  Scenario: TC-CUS005-BVA-04 - Upload file 5MB
    When User upload file "file-5mb.jpg" with size 5MB and type "image/jpeg"
    Then File diterima

  Scenario: TC-CUS005-BVA-05 - Upload file >5MB
    When User upload file "file-6mb.jpg" with size 6MB and type "image/jpeg"
    Then File ditolak

  Scenario: TC-CUS005-BVA-06 - Tidak upload file
    When User tidak memilih file
    And User klik tombol checkout
    Then Sistem memproses pesanan kustom

  # ========================
  # BVA - KOMBINASI
  # ========================
  Scenario: TC-CUS005-BVA-07 - Kombinasi minimum
    When User memilih kombinasi "1"
    Then 1 card material tampil

  Scenario: TC-CUS005-BVA-08 - Kombinasi maksimum
    When User memilih kombinasi "3"
    Then 3 card material tampil

  Scenario: TC-CUS005-BVA-09 - Perubahan kombinasi
    When User memilih kombinasi "3"
    And User memilih kombinasi "1"
    Then 1 card material tampil

  # ========================
  # BVA - BORDIR
  # ========================
  Scenario: TC-CUS005-BVA-10 - Bordir minimum
    When User memilih bordir "0"
    Then Nilai bordir adalah "0"

  Scenario: TC-CUS005-BVA-11 - Bordir maksimum
    When User memilih bordir "5"
    Then Nilai bordir adalah "5"

  # ========================
  # EQP - FILE FORMAT
  # ========================
  Scenario: TC-CUS005-EQP-01 - Upload JPG
    And User upload file "logo.jpg" with size 5MB and type "image/jpeg"
    Then File diterima

  Scenario: TC-CUS005-EQP-02 - Upload PNG
    And User upload file "logo.png" with size 5MB and type "image/png"
    Then File diterima

  Scenario: TC-CUS005-EQP-03 - Upload SVG
    And User upload file "logo.svg" with size 5MB and type "image/svg+xml"
    Then File diterima

  Scenario: TC-CUS005-EQP-04 - Upload format invalid
    And User upload file "logo.mp4" with size 5MB and type "video/mp4"
    Then File ditolak

  # ========================
  # DECISION TABLE - CATEGORY
  # ========================
  Scenario: TC-CUS005-DT-01 - Kategori Bundle
    When User memilih kategori "Bundle"
    Then Section atasan dan bawahan tampil

  Scenario: TC-CUS005-DT-02 - Kategori Atasan
    When User memilih kategori "Atasan"
    Then Hanya section atasan tampil

  Scenario: TC-CUS005-DT-03 - Kategori Bawahan
    When User memilih kategori "Bawahan"
    Then Hanya section bawahan tampil