const MB = 1024 * 1024;

export function createFakeFile({ name, sizeInMB, type }) {
  const sizeInBytes = sizeInMB * MB;

  return new File([new ArrayBuffer(sizeInBytes)], name, { type });
}

export function uploadFile(file) {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  cy.get("[data-cy=file-upload]").then((input) => {
    const nativeInput = input[0];

    Object.defineProperty(nativeInput, "files", {
      value: dataTransfer.files,
      writable: false,
    });

    nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

/**
 * Default kustom configuration used by TC-CUS005 / checkout kustom happy path.
 * data-cy selectors match pages/guest/kustom/index.blade.php & section_config.blade.php
 */
export function configureKustomForCheckout({
  category = "bundle",
  combinations = 2,
  materials = ["Standar", "Katun"],
  bordir = 2,
  size = "M",
  quantity = 2,
  file = { name: "logo.jpg", sizeInMB: 5, type: "image/jpeg" },
} = {}) {
  cy.visit("/kustom");

  cy.get(`[data-cy=category-${category}]`).click();
  cy.get(`[data-cy=combination-${combinations}]`).first().click();

  materials.forEach((material, index) => {
    cy.get(`[data-cy=material-${index + 1}-${material.toLowerCase()}]`)
      .first()
      .click();
  });

  cy.get(`[data-cy=bordir-${bordir}]`).first().click();
  cy.get(`[data-cy=size-${size}]`).click();

  for (let i = 1; i < quantity; i++) {
    cy.get("[data-cy=qty-increment]").click();
  }

  if (file) {
    uploadFile(createFakeFile(file));
    cy.get("[data-cy=file-list]").should("be.visible");
  }

  cy.get("[data-cy=btn-checkout]").click();
  cy.url().should("include", "/checkout");
  cy.get('[data-cy=checkout-type]').should("have.value", "kustom");
}
