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