describe('Kustomisasi Produk - CUS005', () => {

    beforeEach(() => {
        cy.visit('/kustomisasi')
    })

    const MB = 1024 * 1024;

    function createFakeFile({ name, sizeInMB, type }) {
      const sizeInBytes = sizeInMB * MB;
    
      return new File(
        [new ArrayBuffer(sizeInBytes)],
        name,
        { type }
      );
    }

    // reusable actions
    const pilihKategori = (kategori) => {
        cy.get(`[data-cy=category-${kategori}]`).click()
    }

    const pilihKombinasi = (n) => {
        cy.get(`[data-cy=combination-${n}]`).click()
    }

    const pilihMaterial = (index, material) => {
        cy.get(`[data-cy=material-${index}-${material}]`).click()
    }

    const pilihBordir = (n) => {
        cy.get(`[data-cy=bordir-${n}]`).click()
    }

    const pilihSize = (size) => {
        cy.get(`[data-cy=size-${size.toLowerCase()}]`).click()
    }

    const setQuantity = (val) => {
        cy.get('[data-cy=qty-input]').clear().type(val)
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

    const submit = () => {
        cy.get('[data-cy=btn-checkout]').click()
    }

    it('TC-CUS005 - Submit form kustomisasi berhasil', () => {

        cy.intercept('POST', '/checkout').as('checkoutRequest')

        pilihKategori('bundle')

        pilihKombinasi(2)
        pilihMaterial(1, 'drill')
        pilihMaterial(2, 'kanvas')

        pilihBordir(2)
        pilihSize('M')
        setQuantity('20')

        uploadFile('logo.jpg')

        // verify hidden inputs
        cy.get('[data-cy=input-category]').should('have.value', 'bundle')
        cy.get('[data-cy=input-size]').should('have.value', 'M')
        cy.get('[data-cy=input-quantity]').should('have.value', '20')

        submit()

        cy.wait('@checkoutRequest').then((interception) => {
            const body = interception.request.body

            expect(body.category).to.equal('bundle')
            expect(body.size).to.equal('M')
            expect(body.total_quantity).to.equal('20')

            expect(interception.response.statusCode).to.eq(200)
        })
    })

    Then("the file should appear in the selected files list", () => {
        cy.contains("small-file.pdf").should("be.visible");
    });
    
    Then("no warning should be displayed", () => {
        cy.get("[data-cy=warnings]").should("not.exist");
    });

    it('BVA-01 - Quantity minimum', () => {
        setQuantity('1')
        cy.get('[data-cy=qty-decrement]').click()
        cy.get('[data-cy=qty-input]').should('have.value', '1')
    })

    it('BVA-02 - Quantity normal', () => {
        setQuantity('10')
        cy.get('[data-cy=qty-input]').should('have.value', '10')
    })

    it('BVA-03 - Quantity negatif', () => {
        setQuantity('-5')
        cy.get('[data-cy=qty-input]').blur()

        cy.get('[data-cy=qty-input]').invoke('val').then(val => {
            expect(Number(val)).to.be.greaterThan(0)
        })
    })

    it('BVA-04 - Upload file 5MB', () => {
        uploadFile('file-5mb.jpg')
        cy.get('[data-cy=file-upload]').should('exist')
    })

    it('BVA-05 - Upload file >5MB', () => {
        uploadFile('file-6mb.jpg')
        cy.get("[data-cy=warnings]")
            .should("be.visible")
            .and("contain", "large-file.pdf")
            .and("contain", "exceeds 5MB");
    })

    

    it('BVA-06 - Tanpa file', () => {
        submit()
        cy.url().should('include', '/checkout')
    })

    it('BVA-07 - Kombinasi minimum', () => {
        pilihKombinasi(1)
        cy.get('[data-cy^=material-]').should('have.length.at.least', 1)
    })

    it('BVA-08 - Kombinasi maksimum', () => {
        pilihKombinasi(3)
        cy.get('[data-cy^=material-]').should('have.length.at.least', 3)
    })

    it('BVA-09 - Perubahan kombinasi', () => {
        pilihKombinasi(3)
        pilihKombinasi(1)
        cy.get('[data-cy^=material-]').should('have.length.at.least', 1)
    })

    it('BVA-10 - Bordir minimum', () => {
        pilihBordir(0)
        cy.get('[data-cy=bordir-0]').should('have.class', 'bg-black')
    })

    it('BVA-11 - Bordir maksimum', () => {
        pilihBordir(5)
        cy.get('[data-cy=bordir-5]').should('have.class', 'bg-black')
    })

    it('EQP-01 - JPG', () => {
        uploadFile('test.jpg')
    })

    it('EQP-02 - PNG', () => {
        uploadFile('test.png')
    })

    it('EQP-03 - SVG', () => {
        uploadFile('test.svg')
    })

    it('EQP-04 - Invalid format', () => {
        uploadFile('test.mp4')
        cy.contains('format').should('exist')
    })

    it('DT-01 - Bundle', () => {
        pilihKategori('bundle')
        cy.get('[data-cy=section-atasan]').should('be.visible')
        cy.get('[data-cy=section-bawahan]').should('be.visible')
    })

    it('DT-02 - Atasan', () => {
        pilihKategori('atasan')
        cy.get('[data-cy=section-atasan]').should('be.visible')
        cy.get('[data-cy=section-bawahan]').should('not.be.visible')
    })

    it('DT-03 - Bawahan', () => {
        pilihKategori('bawahan')
        cy.get('[data-cy=section-atasan]').should('not.be.visible')
        cy.get('[data-cy=section-bawahan]').should('be.visible')
    })

});