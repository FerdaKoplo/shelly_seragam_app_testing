Feature: Detail Katalog Produk 

# TC-CUS003
Scenario: Verifikasi Customer dapat melihat detail produk katalog
    Given User membuka halaman katalog
    When User melakukan klik di produk pertama 
    Then detail produk yang relevan ditampilkan
    