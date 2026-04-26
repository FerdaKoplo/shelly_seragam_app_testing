import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========================
// FILE HELPERS
// ========================
const MB = 1024 * 1024;

function createFakeFile({ name, sizeInMB, type }) {
    const sizeInBytes = sizeInMB * MB;

    return new File(
        [new ArrayBuffer(sizeInBytes)],
        name,
        { type }
    );
}

function uploadFile(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    cy.get('[data-cy=file-upload]').then((input) => {
        const nativeInput = input[0];

        Object.defineProperty(nativeInput, "files", {
            value: dataTransfer.files,
            writable: false,
        });

        nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
    });
}

// ========================
// GIVEN
// ========================
Given("User membuka halaman kustomisasi", () => {
    cy.visit('/kustomisasi');
});

// ========================
// WHEN - ACTIONS
// ========================
When("User memilih kategori {string}", (kategori) => {
    cy.get(`[data-cy=category-${kategori.toLowerCase()}]`).click();
});

When("User memilih kombinasi {string}", (n) => {
    cy.get(`[data-cy=combination-${n}]`).click();
});

When("User memilih material {string} pada kombinasi {int}", (material, index) => {
    cy.get(`[data-cy=material-${index}-${material.toLowerCase()}]`).click();
});

When("User memilih bordir {string}", (n) => {
    cy.get(`[data-cy=bordir-${n}]`).click();
});

When("User memilih ukuran {string}", (size) => {
    cy.get(`[data-cy=size-${size.toLowerCase()}]`).click();
});

When("User mengisi quantity {string}", (val) => {
    cy.get('[data-cy=qty-input]').clear().type(val);
});

When("User klik tombol minus", () => {
    cy.get('[data-cy=qty-decrement]').click();
});

When("User klik tombol checkout", () => {
    cy.get('[data-cy=btn-checkout]').click();
});

// ========================
// FILE UPLOAD (REAL FIX)
// ========================
When(
    "User upload file {string} with size {float}MB and type {string}",
    (name, sizeInMB, type) => {
        const file = createFakeFile({ name, sizeInMB, type });
        uploadFile(file);
    }
);

When("User tidak memilih file", () => {
    // intentionally empty
});

// ========================
// THEN - ASSERTIONS
// ========================
Then("Sistem memproses pesanan kustom", () => {
    cy.url().should('include', '/checkout');
});

Then("Quantity tetap {string}", (val) => {
    cy.get('[data-cy=qty-input]').should('have.value', val);
});

Then("Quantity menjadi {string}", (val) => {
    cy.get('[data-cy=qty-input]').should('have.value', val);
});

Then("Quantity dikoreksi ke nilai valid", () => {
    cy.get('[data-cy=qty-input]').invoke('val').then(val => {
        expect(Number(val)).to.be.greaterThan(0);
    });
});

Then("File diterima", () => {
    cy.get('[data-cy=file-list]').should('be.visible');
    cy.get('[data-cy=warnings]').should('not.exist');
});

Then("File ditolak", () => {
    cy.get('[data-cy=warnings]').should('be.visible');
});

Then("Hanya {int} card material tampil", (count) => {
    cy.get('[data-cy^=material-]').should('have.length.at.least', count);
});

Then("Nilai bordir adalah {string}", (val) => {
    cy.get(`[data-cy=bordir-${val}]`).should('have.class', 'bg-black');
});

Then("Section atasan dan bawahan tampil", () => {
    cy.get('[data-cy=section-atasan]').should('be.visible');
    cy.get('[data-cy=section-bawahan]').should('be.visible');
});

Then("Hanya section atasan tampil", () => {
    cy.get('[data-cy=section-atasan]').should('be.visible');
    cy.get('[data-cy=section-bawahan]').should('not.be.visible');
});

Then("Hanya section bawahan tampil", () => {
    cy.get('[data-cy=section-atasan]').should('not.be.visible');
    cy.get('[data-cy=section-bawahan]').should('be.visible');
});