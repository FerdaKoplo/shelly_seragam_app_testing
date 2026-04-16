import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

describe('Manajemen Produk Kustomisasi Admin', () => {

  Given('Admin sudah login', () => {
    cy.loginAdmin()
  })

  When('Admin membuka halaman produk kustomisasi', () => {
    cy.visit('/admin/manage-kustom')
  })

  Then('Sistem menampilkan daftar section', () => {
    cy.get('[data-cy^=section-tab-]')
      .should('have.length.greaterThan', 0)
  })

  Then('Admin dapat melihat item dalam section', () => {
    cy.get('[data-cy=kustom-item]').should('exist')
  })

  // CREATE

  When('Admin klik tombol tambah', () => {
    cy.get('[data-cy=btn-add-kustom]').click()
    cy.url().should('include', '/create')
  })

  When('Admin menambahkan aspek utama', () => {
    // click only visible button
    cy.get('[data-cy=btn-add-aspek-utama]')
      .filter(':visible')
      .first()
      .click()

      cy.get('[data-cy=toggle-kombinasi-1]:visible')
        .should('be.visible')
        .click()
  })
  When('Admin menyimpan data', () => {
    cy.get('[data-cy=btn-save-create]').click()
  })

  Then('Data produk kustomisasi berhasil ditambahkan', () => {
    cy.verifyNotification('berhasil')
  })

  // EDIT

  When('Admin klik tombol edit pada salah satu item', () => {
    cy.get('[data-cy=btn-edit-kustom]').first().click()
    cy.url().should('include', '/edit')
  })

  When('Admin mengubah konfigurasi', () => {
    cy.get('[data-cy=toggle-kombinasi-1]')
      .should('be.visible')
      .click()
  })

  When('Admin menyimpan perubahan', () => {
    cy.get('[data-cy=btn-save-edit]').click()
  })

  Then('Perubahan berhasil disimpan', () => {
    cy.verifyNotification('berhasil')
  })

  // DELETE

  When('Admin klik tombol hapus pada salah satu item', () => {
    cy.get('[data-cy=kustom-item]').then(($items) => {
      cy.wrap($items.length).as('countBefore')
    })

    cy.get('[data-cy=btn-delete-kustom]').first().click()
  })

  When('Admin mengkonfirmasi penghapusan', () => {
    cy.get('[data-cy=confirm-delete]').click()
  })

  Then('Data berhasil dihapus', () => {
    cy.verifyNotification('berhasil')

    cy.get('@countBefore').then((countBefore) => {
      cy.get('[data-cy=kustom-item]')
        .should('have.length.lessThan', countBefore)
    })
  })

})