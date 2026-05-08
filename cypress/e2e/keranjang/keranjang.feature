
Feature: Cart - Product Katalog

  # TC-CUS004
  Scenario: User adds product to cart
    Given I open a product detail page
    When I add the product to the cart
    And I go to the cart page
    Then I should see the product in the cart


  # TC-CUS004-A
  Scenario: Warning appears when leaving cart page
    Given I have a product in the cart
    When I try to leave the page
    Then I should get a leave warning
  
  # TC-CUS004-B
  Scenario: User can click recomendation item
    When I go to the cart page
    And I click item recomendation
    Then I should be redirected to detail page

  # TC-CUS004-EP-01
  Scenario: Increase quantity within valid range
    Given I have a product in the cart
    When I increase the quantity
    Then the quantity should increase


  # TC-CUS004-BVA-02
  Scenario: Quantity minimum is 1
    Given I have a product in the cart
    When I decrease the quantity to minimum
    Then the quantity should remain 1


  # TC-CUS004-BVA-03
  Scenario: Quantity maximum equals stock
    Given I have a product in the cart
    When I increase quantity up to stock limit
    Then the quantity should equal stock


  # TC-CUS004-BVA-04
  Scenario: Quantity cannot exceed stock
    Given I have a product in the cart
    When I increase quantity up to stock limit
    Then the quantity should not exceed stock


  # TC-CUS004-BVA-05
  Scenario: Quantity cannot less than 1
    Given I have a product in the cart
    When I decrease the quantity to minimum
    Then the quantity should remain 1
  
  
  # TC-CUS004-DELETE
  Scenario: User Can Remove Item
    Given I have a product in the cart
    When I click remove item button
    Then the item should be removed from the cart

  # TC-CUS004-EMPTY
  Scenario: User clears the cart
    Given I have a product in the cart
    When I clear the cart
    Then the cart should be empty