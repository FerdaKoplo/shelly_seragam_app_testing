import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * TC-CUS004
 */
Given("I open a product detail page", () => {
  cy.visit("/katalog");
  cy.get("[data-cy=product-item]").first().click();
});

/**
 * TC-CUS004
 */
When("I add the product to the cart", () => {
  cy.get("[data-cy=btn-add-to-cart]").click();
});

/**
 * TC-CUS004
 */
When("I go to the cart page", () => {
  cy.visit("/keranjang");
});

/**
 * TC-CUS004
 */
Then("I should see the product in the cart", () => {
  cy.get("[data-cy=cart-item]").should("exist");
});


/**
 * TC-CUS004-A
 */
Then("I should get a leave warning", () => {
  cy.window().then((win) => {
    const event = new Event("beforeunload", { cancelable: true });
    const prevented = !win.dispatchEvent(event);

    expect(prevented).to.be.true;
  });
});

Given("I have a product in the cart", () => {
  cy.visit("/katalog");
  cy.get("[data-cy=product-item]").first().click();
  cy.get("[data-cy=btn-add-to-cart]").click();
  cy.visit("/keranjang");
  cy.get("[data-cy=cart-item]").should("exist");
});

When("I click item recomendation", () => {
  cy.get("[data-cy=recommendation-item]").should("exist");;
  cy.get("[data-cy=recommendation-item]").first().click();

});

When("I should be redirected to detail page", () => {
  cy.url().should("include", "/katalog/");
});

    

When("I try to leave the page", () => {
  cy.window().then((win) => {
    const event = new Event("beforeunload");
    win.dispatchEvent(event);
  });
});


/**
 * TC-CUS004-EP-01
 */
When("I increase the quantity", () => {
  cy.get("[data-cy=cart-item]")
    .first()
    .get("[data-cy=increment-btn]")
    .click();
});

/**
 * TC-CUS004-EP-01
 */
Then("the quantity should increase", () => {
  cy.get("[data-cy=quantity-input]")
    .invoke("val")
    .then((val) => {
      expect(Number(val)).to.be.greaterThan(1);
    });
});

/**
 * TC-CUS004-BVA-02
 */
When("I decrease the quantity to minimum", () => {
  cy.get("[data-cy=cart-item]").first().within(() => {
    // Ensure we are above 1 first
    cy.get("[data-cy=increment-btn]").click();

    // Now go down
    cy.get("[data-cy=decrement-btn]").click();
  });
});

/**
 * TC-CUS004-BVA-02
 */
Then("the quantity should remain 1", () => {
  cy.get("[data-cy=cart-item]").first().within(() => {
    cy.get("[data-cy=quantity-input]")
      .invoke("val")
      .should("eq", "1");

    cy.get("[data-cy=decrement-btn]")
      .should("be.disabled");
  });
});


/**
 * TC-CUS004-BVA-03
 */
When("I increase quantity up to stock limit", () => {
  // depends on your backend data, don’t pretend it’s dynamic if it isn’t
  cy.get('[data-cy=cart-item]').first().then(($item) => {
    const stock = Number($item.attr('data-stock'));

    // // spam increment like a chaos agent
    for (let i = 0; i < stock-1; i++) {
      cy.wrap($item).get('[data-cy=increment-btn]').click();
    }

  });
});

/**
 * TC-CUS004-BVA-03
 */
Then("the quantity should equal stock", () => {
  cy.get('[data-cy=cart-item]').first().then(($item) => {
    const stock = Number($item.attr('data-stock'));

    cy.wrap($item)
      .get('[data-cy=quantity-input]')
      .invoke('val')
      .then((val) => {
        expect(Number(val)).to.eq(stock);
      });
  });
});

/**
 * TC-CUS004-BVA-04
 */

/**
 * TC-CUS004-BVA-04
 */
Then("the quantity should not exceed stock", () => {
  cy.get('[data-cy=cart-item]').first().then(($item) => {
    const stock = Number($item.attr('data-stock'));
    cy.get("[data-cy=increment-btn]")
      .should("be.disabled");

    cy.wrap($item)
      .get('[data-cy=quantity-input]')
      .invoke('val')
      .then((val) => {
        expect(Number(val)).to.eq(stock);
      });
  });

});


/**
 * TC-CUS004-BVA-05
 */
When("I click remove item button", () => {
  cy.get("[data-cy=remove-item-btn]").click();
});

/**
 * TC-CUS004-BVA-05
 */
Then("the item should be removed from the cart", () => {
  cy.get("[data-cy=cart-item]").should("not.exist");
});

/**
 * TC-CUS004-EMPTY
 */
When("I clear the cart", () => {
  cy.acceptAlert("Kosongkan seluruh item di keranjang?");
  cy.get("[data-cy=clear-cart-btn]").click();
});

/**
 * TC-CUS004-EMPTY
 */
Then("the cart should be empty", () => {
  cy.get("[data-cy=cart-empty]").should("be.visible");
});