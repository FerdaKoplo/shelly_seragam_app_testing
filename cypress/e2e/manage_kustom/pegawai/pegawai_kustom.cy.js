import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

describe('Manajemen Produk Kustomisasi Pegawai', () => {

  Given('Pegawai sudah login', () => {
    cy.loginPegawai()
  })

  When('Pegawai membuka halaman produk kustomisasi', () => {
    cy.visit('/admin/manage-kustom')
  })

  Then('Pegawai dapat melihat item dalam section', () => {
    cy.get('[data-cy=kustom-item]').should('exist')
  })

  // CREATE

  When('Pegawai klik tombol tambah', () => {
    cy.get('[data-cy=btn-add-kustom]').click()
    cy.url().should('include', '/create')
  })

  When('Pegawai menambahkan aspek utama', () => {
    // click only visible button
    cy.get('[data-cy=btn-add-aspek-utama]')
      .filter(':visible')
      .first()
      .click()

      cy.get('[data-cy=toggle-kombinasi-1]:visible')
        .should('be.visible')
        .click()
  })
  When('Pegawai menyimpan data', () => {
    cy.get('[data-cy=btn-save-create]').click()
  })

  // EDIT

  When('Pegawai klik tombol edit pada salah satu item', () => {
    cy.get('[data-cy=btn-edit-kustom]').first().click()
    cy.url().should('include', '/edit')
  })

  When('Pegawai mengubah konfigurasi', () => {
    cy.get('[data-cy=toggle-kombinasi-1]')
      .should('be.visible')
      .click()
  })

  When('Pegawai menyimpan perubahan', () => {
    cy.get('[data-cy=btn-save-edit]').click()
  })


  // DELETE

  When('Pegawai klik tombol hapus pada salah satu item', () => {
    cy.get('[data-cy=kustom-item]').then(($items) => {
      cy.wrap($items.length).as('countBefore')
    })

    cy.get('[data-cy=btn-delete-kustom]').first().click()
  })

  When('Pegawai mengkonfirmasi penghapusan', () => {
    cy.get('[data-cy=confirm-delete]').click()
  })

 

})