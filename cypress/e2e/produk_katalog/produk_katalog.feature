Feature: Halaman Produk Katalog Test

Scenario: Customer dapat melihat dan mencari produk di halaman katalog
    Given guest open the katalog page
    Then guest should see the product list
    And guest should see at least one product item
    When guest search product with keyword "Kemeja"
    And guest filter by category "Atasan"
    And guest filter by size "L"
    And guest filter by availability "Tersedia"
    Then guest should see filtered products

    