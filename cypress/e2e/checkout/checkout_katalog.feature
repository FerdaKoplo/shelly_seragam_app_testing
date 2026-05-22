Feature: Checkout Produk Katalog

Background:
  Given Customer memiliki produk katalog di keranjang
  


Scenario: TC-CUS006 - Customer berhasil checkout produk katalog
  Given Customer memiliki produk katalog di keranjang
  When Customer membuka halaman checkout
  Then Ringkasan pesanan tampil
  When Customer mengisi data checkout katalog yang valid
  And Customer memilih tujuan pengiriman
  And Customer memilih opsi pengiriman 
  And Customer klik tombol bayar
  Then Customer diarahkan ke halaman pembayaran Xendit
  And Customer menyelesaikan pembayaran di Xendit
  Then Sistem menampilkan notifikasi pesanan berhasil

