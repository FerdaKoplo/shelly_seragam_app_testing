Feature: Landing Page Test

Scenario: All main components are visible on landing page
    Given guest open the landing page
    Then guest should see the hero section
    And guest should see the stats section
    And guest should see the katalog section
    And guest should see at least one product item
    And guest should see the WhatsApp button
    And guest should see the custom uniform button
    And guest should see the location section

Scenario: User clicks WhatsApp call-to-action button
  Given guest open the landing page
  When guest click the WhatsApp button
  Then guest should be redirected to WhatsApp