context('Restore session', () => {
  it('runs', () => {
    // load site
    cy.setCookie('country', 'DE')
    cy.visit(
      '/?feature:refresh&feature:invoice&invoice_key=golden-reduce-heft-alia-cumin&utm_source=test'
    )

    // upload test model, configures and goes to cart
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

    cy.contains('button:not(:disabled)', 'Select').click()
    cy.get('#material-step-2')
      .contains('button:not(:disabled)', 'Select')
      .click()
    cy.get('#material-step-3')
      .contains('button:not(:disabled)', 'Select')
      .click()
    cy.contains('button', 'Add to cart').click()

    cy.contains('button', 'Checkout')

    // reload and restores from session
    cy.visit(
      '/?feature:refresh&feature:invoice&invoice_key=golden-reduce-heft-alia-cumin&utm_source=test'
    )

    // upload another test model, configures and goes to cart
    const dropEvent2 = {
      dataTransfer: {
        files: []
      }
    }

    cy.fixture('test-model.stl', 'base64').then(model =>
      Cypress.Blob.base64StringToBlob(model, 'application/vnd.ms-pki.stl').then(blob => {
        dropEvent2.dataTransfer.files.push(new File([blob], 'test-model.stl', {type: ''}))
      })
    )

    cy.get('.UploadArea').trigger('drop', dropEvent2)
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
