Feature: Voucher Management

  Background:
    Given admin already logged in
    And admin open voucher management page

  Scenario: TC-ADM007-01 Add new voucher
    When admin add voucher with valid data
    Then voucher successfully saved

  Scenario: TC-ADM007-02 Add duplicate voucher code
    Given there should be a voucher with PROMOSELLER code
    When admin add voucher with duplicate code
    Then system should show duplicate code error

  Scenario: TC-ADM007-03 Update voucher
    When admin update voucher value
    Then voucher successfully updated

  Scenario: TC-ADM007-04 Delete voucher
    When admin search voucher "PROMOSELLER"
    When admin delete voucher
    Then voucher successfully deleted

  Scenario: TC-ADM007-05 Auto generate voucher code
    When admin add voucher without code
    Then system should generate voucher code

  Scenario: TC-ADM007-06 Invalid expired date
    When admin add voucher with invalid expired date
    Then system should reject voucher date

  Scenario: TC-ADM007-07 Empty required field
    When admin submit empty voucher form
    Then required validation should appear

  Scenario: TC-ADM007-08 Create percentage voucher
    When admin create percentage voucher
    Then percentage voucher successfully saved

  Scenario: TC-ADM007-09 Negative discount value
    When admin input negative discount value
    Then negative value should be rejected

  Scenario: TC-ADM007-10 Search voucher
    When admin search voucher "Promo"
    Then matching voucher "Promo" should appear


  Scenario: TC-ADM007-EQP-01 Invalid past date
    When admin create voucher with date "2026-06-22"
    Then system should show error "Tanggal selesai tidak boleh kurang dari hari ini."

  Scenario: TC-ADM007-EQP-02 Valid today date
    When admin create voucher with date "2026-06-23"
    Then voucher successfully saved

  Scenario: TC-ADM007-EQP-03 Valid future date
    When admin create voucher with date "2026-12-31"
    Then voucher successfully saved


  Scenario: TC-ADM007-EQP-04 Invalid negative discount
    When admin create voucher with discount "-10000"
    Then system should show error "Nilai diskon tidak boleh negatif."

  Scenario: TC-ADM007-EQP-05 Invalid minus zero discount
    When admin create voucher with discount "-0"
    Then system should show error "Nilai diskon minimal adalah 1."

  Scenario: TC-ADM007-EQP-06 Invalid zero discount
    When admin create voucher with discount "0"
    Then system should show error "Nilai diskon minimal adalah 1."

  Scenario: TC-ADM007-EQP-07 Valid minimum discount
    When admin create voucher with discount "1"
    Then voucher successfully saved

  Scenario: TC-ADM007-EQP-08 Valid normal discount
    When admin create voucher with discount "15000"
    Then voucher successfully saved
