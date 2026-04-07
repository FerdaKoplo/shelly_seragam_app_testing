Feature: Admin login Shelly Seragam App

  Scenario: Admin login valid
    Given admin berada di halaman login
    When admin mengisi username "admin" dan password "admin"
    And admin klik tombol login
    Then admin diarahkan ke halaman statistik transaksi

  Scenario: Admin login invalid
    Given admin berada di halaman login
    When admin mengisi username "wronguser123" dan password "salahpassword"
    And admin klik tombol login
    Then admin tetap di halaman login dan melihat pesan error