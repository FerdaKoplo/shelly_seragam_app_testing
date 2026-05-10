Feature: Cta Test

# TC-CUS007
Scenario: User clicks WhatsApp call-to-action button in katalog
  Given User membuka halaman katalog
  When guest click the WhatsApp button
  Then guest should be redirected to WhatsApp

Scenario: User clicks WhatsApp call-to-action button in landing page
  Given guest open the landing page
  When guest click the WhatsApp button
  Then guest should be redirected to WhatsApp

Scenario: User clicks WhatsApp call-to-action button in location section
  Given guest open the landing page
  When guest click the WhatsApp button in location section
  Then guest should be redirected to WhatsApp