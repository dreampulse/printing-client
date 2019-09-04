context('Restore session', () => {
  let LOCAL_STORAGE_MEMORY = {}

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('country')

    cy.on('window:before:unload', () => {
      LOCAL_STORAGE_MEMORY = {}
      Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key]
      })
    })
    cy.on('window:before:load', () => {
      Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
      })
    })
  })

  it('loads', () => {
    cy.clearLocalStorage()
    cy.setCookie('country', 'DE')
    cy.visit(
      '/?feature:refresh&feature:invoice&invoice_key=golden-reduce-heft-alia-cumin&utm_source=test'
    )
  })

  it('uploads test model, configures and goes to cart', () => {
    const dropEvent = {
      dataTransfer: {
        files: []
      }
    }

    cy.fixture('test-model.stl', 'base64').then(model =>
      Cypress.Blob.base64StringToBlob(model, 'application/vnd.ms-pki.stl').then(blob => {
        dropEvent.dataTransfer.files.push(new File([blob], 'test-model.stl', {type: ''}))
      })
    )

    cy.get('.UploadArea').trigger('drop', dropEvent)
    cy.contains('button', 'Upload').click()
    cy.get('.UploadModelItem').should('have.length', 1)
    cy.contains('button', 'Configure Selection').click()

    cy.contains('button', 'Select').click()
    cy.get('#material-step-2')
      .contains('button', 'Select')
      .click()
    cy.get('#material-step-3')
      .contains('button', 'Select')
      .click()
    cy.contains('button', 'Add to cart').click()

    cy.contains('button', 'Checkout')
  })

  it('reloads and restores from session', () => {
    cy.setCookie('country', 'DE')
    cy.visit(
      '/?feature:refresh&feature:invoice&invoice_key=golden-reduce-heft-alia-cumin&utm_source=test'
    )
  })

  it('uploads another test model, configures and goes to cart', () => {
    const dropEvent = {
      dataTransfer: {
        files: []
      }
    }

    cy.fixture('test-model.stl', 'base64').then(model =>
      Cypress.Blob.base64StringToBlob(model, 'application/vnd.ms-pki.stl').then(blob => {
        dropEvent.dataTransfer.files.push(new File([blob], 'test-model.stl', {type: ''}))
      })
    )

    cy.get('.UploadArea').trigger('drop', dropEvent)
    cy.contains('button', 'Upload').click()
    cy.get('.UploadModelItem').should('have.length', 1)
    cy.contains('button', 'Configure Selection').click()

    cy.contains('button', 'Select').click()
    cy.get('#material-step-2')
      .contains('button', 'Select')
      .click()
    cy.get('#material-step-3')
      .contains('button', 'Select')
      .click()
    cy.contains('button', 'Add to cart').click()

    cy.contains('button', 'Checkout')

    cy.get('.CartModelItem').should('have.length', 2)
  })
})
