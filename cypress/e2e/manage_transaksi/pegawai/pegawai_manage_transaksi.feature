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