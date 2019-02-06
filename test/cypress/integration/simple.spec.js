context('Simple application flow', () => {
  it('loads', () => {
    cy.setCookie('country', 'DE')
    cy.visit(
      '/?feature:refresh&feature:invoice&invoice_key=golden-reduce-heft-alia-cumin&utm_source=test'
    )
  })

  it('uploads test model', () => {
    const dropEvent = {
      dataTransfer: {
        files: []
      }
    }

    cy.fixture('test-model.stl', 'base64').then(model =>
      Cypress.Blob.base64StringToBlob(model, 'application/vnd.ms-pki.stl').then(blob => {
        dropEvent.dataTransfer.files.push(blob)
      })
    )

    cy.get('.upload-area').trigger('drop', dropEvent)
    cy.contains('button', 'Upload').click()
    cy.contains('.model-list', 'test-model.stl')
  })

  it('selects material and provider', () => {
    cy.contains('button', 'Customize').click()

    cy.get('#section-material')
      .contains('button', 'Select')
      .click()

    cy.get('#section-finish')
      .contains('button:not(:disabled)', 'Select')
      .click()

    cy.get('#section-provider')
      .contains('button', 'Add to cart')
      .click()
  })

  it('handles address form', () => {
    cy.contains('.headline', 'Shipping Address')
    cy.contains('button', 'Add Address').click()

    cy.get('input[name="shippingAddress.firstName"]').type('TEST firstName')
    cy.get('input[name="shippingAddress.lastName"]').type('TEST lastName')
    cy.get('input[name="shippingAddress.address"]').type('TEST address')
    cy.get('input[name="shippingAddress.city"]').type('TEST city')
    cy.get('input[name="shippingAddress.zipCode"]').type('TEST zipCode')
    cy.get('input[name="emailAddress"]').type('TEST@example.com')
    cy.get('input[name="phoneNumber"]').type('0123456789')

    cy.contains('button', 'Confirm').click()
  })

  it('pays per invoice', () => {
    cy.contains('.headline', 'Review Order')
    cy.contains('.model-item', 'test-model.stl')

    cy.contains('button', 'Pay with Invoice').click()
  })

  it('reaches success page', () => {
    cy.contains('.headline', 'Thank you')
  })
})
