# Cypress E2E Testing Project

Proyek Testing Shelly Seragam App berisi automated testing menggunakan **Cypress** dan **Cucumber** (BDD).

---

## Prasyarat

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- [Git](https://git-scm.com/)

---

## Instalasi

```bash
# 1. Clone repository
git clone <url-repository>

# 2. Masuk ke folder project
cd <nama-folder>

# 3. Install dependencies
npm install
```

---

## Menjalankan Test

```bash
# Buka Cypress GUI
npx cypress open

# Jalankan test di terminal (headless)
npx cypress run
```

---

## Cara Kolaborasi

### 1. Pastikan branch `main` kamu up-to-date
```bash
git checkout main
git pull origin main
```

### 2. Buat branch baru dengan format:
```
nama_fitur_test
```

Contoh:
```bash
git checkout -b budi_login_test
git checkout -b siti_produk_test
git checkout -b ivan_dashboard_test
```

### 3. Tambahkan file test kamu
Buat file `.feature` dan `.cy.js` di dalam folder yang sesuai:
```
cypress/
  e2e/
    login/
      login.feature
      login.cy.js
    produk/
      produk.feature
      produk.cy.js
```

### 4. Commit dan push branch kamu
```bash
git add .
git commit -m "feat: tambah test login pegawai"
git push origin budi_login_test
```

### 5. Buat Pull Request
- Buka repository di GitHub
- Klik **"Compare & pull request"**
- Isi deskripsi perubahan
- Minta review ke anggota tim lain

---

## Struktur Folder

```
cypress/
├── e2e/              # File .feature dan .cy.js
├── fixtures/         # Data dummy untuk testing
└── support/          # Commands dan konfigurasi global
cypress.config.js     # Konfigurasi Cypress
package.json          # Dependencies
```

---

## Aturan Penamaan Branch

| Format | Contoh |
|---|---|
| `nama_fitur_test` | `budi_login_test` |
| `nama_fitur_test` | `siti_tambah_produk_test` |
| `nama_fitur_test` | `ivan_hapus_katalog_test` |

> Jangan langsung push ke branch `main`. Selalu buat branch baru untuk setiap fitur atau test case.