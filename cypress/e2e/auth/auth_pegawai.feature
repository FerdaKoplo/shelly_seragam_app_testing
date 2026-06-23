Feature: Login dan Logout Pegawai

  # TC-PGW001-DT-01 (R1)
  Scenario: Pegawai login dengan username dan password valid
    Given user_pegawai berada di halaman login
    When pegawai mengisi username "budi.santoso" dan password "pegawai"
    And pegawai klik tombol login
    Then pegawai harus diarahkan ke halaman dashboard

  # TC-PGW001-DT-02 (R2)
  Scenario: Pegawai login dengan username terdaftar tetapi password salah
    Given user_pegawai berada di halaman login
    When pegawai mengisi username "budi.santoso" dan password "salahpassword123"
    And pegawai klik tombol login
    Then pegawai harus tetap di halaman login dengan pesan error "Akun tidak ditemukan atau password salah"

  # TC-PGW001-DT-03 (R3)
  Scenario: Pegawai login dengan akun yang statusnya nonaktif
    Given user_pegawai berada di halaman login
    When pegawai mengisi username "rudi.wijaya" dan password "Pegawai123!"
    And pegawai klik tombol login
    Then pegawai harus tetap di halaman login dengan pesan error "Akun tidak aktif"

  # TC-PGW001-NEG (R4 & R5)
  Scenario: Pegawai login dengan username yang tidak terdaftar
    Given user_pegawai berada di halaman login
    When pegawai mengisi username "pegawai_salah" dan password "salah_pass123"
    And pegawai klik tombol login
    Then pegawai harus tetap di halaman login dengan pesan error "Akun tidak ditemukan atau password salah"

  # TC-PGW001-A
  Scenario: Pegawai logout dari dashboard
    Given pegawai berada di halaman dashboard
    When pegawai klik tombol logout
    Then pegawai harus diarahkan ke halaman login