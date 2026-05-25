Feature: TC-ADM005 Management Transaksi

# TC-ADM005-A
Scenario: Admin melihat seluruh data transaksi dan detail transaksi

When admin navigasi ke halaman manage transaksi
Then admin diarahkan ke halaman manage transaksi
Then admin melihat daftar transaksi tersedia di tabel
When admin mengklik tombol detail pada salah satu transaksi
Then modal detail transaksi terbuka
And modal menampilkan informasi customer
And modal menampilkan detail item pesanan

# TC-ADM005-B
Scenario: Admin mengubah status transaksi dengan mengisi nomor resi

When admin navigasi ke halaman manage transaksi
Then admin diarahkan ke halaman manage transaksi
When admin mengklik tombol detail pada salah satu transaksi
Then modal detail transaksi terbuka
When admin mengisi nomor resi customer
And admin mengklik tombol simpan perubahan transaksi
Then perubahan transaksi berhasil disimpan

# TC-ADM005-C
Scenario: Admin memfilter daftar transaksi berdasarkan tipe produk

When admin navigasi ke halaman manage transaksi
Then admin diarahkan ke halaman manage transaksi
When admin memilih filter transaksi "Katalog"
Then tabel transaksi hanya menampilkan tipe "Katalog"
When admin memilih filter transaksi "Kustom"
Then tabel transaksi hanya menampilkan tipe "Kustom"
When admin mereset filter transaksi
Then admin melihat daftar transaksi tersedia di tabel

# TC-ADM005-D
Scenario: Admin mencari transaksi berdasarkan kata kunci

When admin navigasi ke halaman manage transaksi
Then admin diarahkan ke halaman manage transaksi
When admin mencari transaksi dengan kata kunci dari transaksi pertama
Then hasil pencarian transaksi menampilkan transaksi yang cocok

# TC-ADM005-E
Scenario: Admin memperbarui transaksi katalog dengan nomor resi

When admin navigasi ke halaman manage transaksi
Then admin diarahkan ke halaman manage transaksi
When admin membuka detail transaksi katalog pertama
Then modal detail transaksi katalog terbuka
When admin mengisi nomor resi customer
And admin mengklik tombol simpan perubahan transaksi
Then perubahan transaksi berhasil disimpan

# TC-ADM005-F
Scenario: Admin mengunggah bukti pembayaran transaksi kustom

When admin navigasi ke halaman manage transaksi
Then admin diarahkan ke halaman manage transaksi
When admin membuka detail transaksi kustom yang belum ada bukti pembayaran
Then modal detail transaksi kustom terbuka
And modal menampilkan form unggah bukti pembayaran kustom
When admin mengunggah bukti pembayaran kustom
Then bukti pembayaran kustom berhasil diunggah