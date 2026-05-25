Feature: Statistik Transaksi Admin

  # TC-ADM005-G
  Scenario: Admin dapat melihat statistik transaksi
    Given I login as admin
    When I open halaman statistik transaksi
    Then statistik transaksi should be displayed properly

  # TC-ADM005-H
  Scenario: Admin dapat mengunduh laporan transaksi
    Given I login as admin
    When I open halaman statistik transaksi
    And I click export spreadsheet button
    Then file laporan transaksi should be downloaded

  # TC-ADM005-I
  Scenario: Admin dapat memfilter statistik transaksi berdasarkan bulan
    Given I login as admin
    When I open halaman statistik transaksi
    And I select month filter "1"
    Then statistik transaksi should match selected month