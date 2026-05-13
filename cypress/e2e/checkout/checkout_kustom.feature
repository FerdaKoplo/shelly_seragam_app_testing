Feature: Checkout Produk Kustom

Background:
  Given User membuka halaman kustomisasi

Scenario: TC-CUS006-KUSTOM - Customer berhasil checkout produk kustom
  When User memilih kategori "Bundle"
  And User memilih kombinasi "2"
  And User memilih material "Standar" pada kombinasi 1
  And User memilih material "Katun" pada kombinasi 2
  And User memilih bordir "2"
  And User memilih ukuran "M"
  And User menambah quantity hingga 2
  And User upload file "logo.jpg" with size 5MB and type "image/jpeg"
  And User klik tombol checkout
  Then Sistem memproses pesanan kustom
  When Customer mengisi data checkout kustom yang valid
  And Customer memilih tujuan pengiriman
  And Customer memilih opsi pengiriman
  And Customer klik tombol buat pesanan
  Then Sistem menampilkan notifikasi pesanan berhasil