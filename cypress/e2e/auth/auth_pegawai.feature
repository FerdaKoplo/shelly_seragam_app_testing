Feature: Pegawai login ke sistem dengan kredensial valid

  # TC-PGW001
  Scenario: Pegawai melakukan login dengan kredensial valid
    Given user_pegawai berada di halaman login
    When pegawai mengisi username "budi.santoso" dan password "pegawai"
    And pegawai klik tombol login
    Then pegawai harus diarahkan ke halaman dashboard

  # TC-PGW001-A
  Scenario: Pegawai melakukan logout dari halaman dashboard
    Given pegawai sudah login dan berada di halaman dashboard
    When pegawai klik tombol logout
    Then pegawai harus diarahkan ke halaman login

  # TC-PGW001-NEG
  Scenario: Pegawai melakukan login dengan kredensial tidak valid
    Given user berada di halaman login sebagai pegawai
    When pegawai mengisi username "wronguser123" dan password "salahpassword"
    And pegawai klik tombol login
    Then pegawai harus tetap di halaman login dengan pesan error
