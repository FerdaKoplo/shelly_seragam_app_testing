Feature: Checkout Produk Katalog

Background:
  Given Customer memiliki produk katalog di keranjang
  


Scenario: TC-CUS006 - Customer berhasil checkout produk katalog
  Given Customer memiliki produk katalog di keranjang
  When Customer membuka halaman checkout
  Then Ringkasan pesanan tampil

  When Customer mengisi data checkout katalog yang valid
  And Customer memilih tujuan pengiriman
  And Customer memilih opsi pengiriman "JNE Reguler"
  And Customer klik tombol bayar
  Then Customer diarahkan ke halaman pembayaran Xendit


Scenario: TC-CUS006-EP-01 - Kode pos kurang dari minimum
  When Customer mengisi data checkout dengan kode pos "9945"
  And Customer klik tombol bayar
  Then Error "Kode pos tidak valid" tampil

Scenario: TC-CUS006-EP-02 - Kode pos valid 5 digit
  When Customer mengisi data checkout dengan kode pos "99454"
  Then Field kode pos diterima

Scenario: TC-CUS006-EP-03 - Kode pos lebih dari maksimum
  When Customer mengisi data checkout dengan kode pos "994545"
  And Customer klik tombol bayar
  Then Error "Kode pos tidak valid" tampil

Scenario: TC-CUS006-BVA-01 - Nomor HP kurang dari minimum
  When Customer mengisi nomor hp "081234"
  And Customer klik tombol bayar
  Then Error "Nomor telepon tidak valid" tampil

Scenario: TC-CUS006-BVA-02 - Nomor HP minimum valid
  When Customer mengisi nomor hp "0812345"
  Then Field nomor hp diterima

Scenario: TC-CUS006-BVA-03 - Nomor HP maksimum valid
  When Customer mengisi nomor hp "081234567890123"
  Then Field nomor hp diterima

Scenario: TC-CUS006-BVA-04 - Nomor HP melebihi maksimum
  When Customer mengisi nomor hp "0812345678901234"
  And Customer klik tombol bayar
  Then Error "Nomor telepon tidak valid" tampil

Scenario: TC-CUS006-EP-05 - Opsi pengiriman tidak dipilih
  When Customer mengisi data checkout valid tanpa memilih pengiriman
  And Customer klik tombol bayar
  Then Error "Pilih opsi pengiriman" tampil