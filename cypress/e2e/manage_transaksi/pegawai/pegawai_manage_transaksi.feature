Feature: TC-PGW004 Management Transaksi (Pegawai)

# TC-PGW004-A
Scenario: Pegawai melihat seluruh data transaksi dan detail transaksi

When pegawai navigasi ke halaman manage transaksi
Then pegawai diarahkan ke halaman manage transaksi
Then pegawai melihat daftar transaksi tersedia di tabel
When pegawai mengklik tombol detail pada salah satu transaksi
Then modal detail transaksi terbuka untuk pegawai
And modal menampilkan informasi customer untuk pegawai
And modal menampilkan detail item pesanan untuk pegawai

# TC-PGW004-B
Scenario: Pegawai mengubah status transaksi dengan mengisi nomor resi

When pegawai navigasi ke halaman manage transaksi
Then pegawai diarahkan ke halaman manage transaksi
When pegawai mengklik tombol detail pada salah satu transaksi
Then modal detail transaksi terbuka untuk pegawai
When pegawai mengisi nomor resi customer
And pegawai mengklik tombol simpan perubahan transaksi
Then perubahan transaksi berhasil disimpan oleh pegawai

# TC-PGW004-C
Scenario: Pegawai memfilter daftar transaksi berdasarkan tipe produk

When pegawai navigasi ke halaman manage transaksi
Then pegawai diarahkan ke halaman manage transaksi
When pegawai memilih filter transaksi "Katalog"
Then tabel transaksi hanya menampilkan tipe "Katalog"
When pegawai memilih filter transaksi "Kustom"
Then tabel transaksi hanya menampilkan tipe "Kustom"
When pegawai mereset filter transaksi
Then pegawai melihat daftar transaksi tersedia di tabel

# TC-PGW004-D
Scenario: Pegawai mencari transaksi berdasarkan kata kunci

When pegawai navigasi ke halaman manage transaksi
Then pegawai diarahkan ke halaman manage transaksi
When pegawai mencari transaksi dengan kata kunci dari transaksi pertama
Then hasil pencarian transaksi menampilkan transaksi yang cocok

# TC-PGW004-E
Scenario: Pegawai memperbarui transaksi katalog dengan nomor resi

When pegawai navigasi ke halaman manage transaksi
Then pegawai diarahkan ke halaman manage transaksi
When pegawai membuka detail transaksi katalog pertama
Then modal detail transaksi katalog terbuka untuk pegawai
When pegawai mengisi nomor resi customer
And pegawai mengklik tombol simpan perubahan transaksi
Then perubahan transaksi berhasil disimpan oleh pegawai

# TC-PGW004-F
Scenario: Pegawai mengunggah bukti pembayaran transaksi kustom

When pegawai navigasi ke halaman manage transaksi
Then pegawai diarahkan ke halaman manage transaksi
When pegawai membuka detail transaksi kustom yang belum ada bukti pembayaran
Then modal detail transaksi kustom terbuka untuk pegawai
And modal menampilkan form unggah bukti pembayaran kustom untuk pegawai
When pegawai mengunggah bukti pembayaran kustom
Then bukti pembayaran kustom berhasil diunggah