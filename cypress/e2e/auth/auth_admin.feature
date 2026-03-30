Feature: Admin login ke sistem dengan kredensial valid 
    # TC-ADM001 
    Scenario: Admin melakukan login dengan kredensial valid
        Given user_admin berada di halaman login
        When admin mengisi username "admin" dan password "admin"
        And admin klik tombol login
        Then admin harus diarahkan ke halaman dashboard
    
    # TC-ADM001-A
    Scenario: Admin melakukan logout dari halaman dashboard statistik transaksi
        Given admin berada di halaman statistik transaksi
        When admin klik tombol logout
        Then admin harus diarahkan ke halaman login
    
    # TC-ADM001-NEG
    Scenario: Admin melakukan login dengan kredensial yang tidak valid
        Given user berada di halaman login
        When user mengisi username "wronguser123" dan password "salahpassword"
        And user klik tombol login
        Then user harus tetap di halaman login