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
        dropEvent.dataTransfer.files.push(new File([blob], 'test-model.stl', {type: ''}))
      })
    )

    cy.get('.UploadArea').trigger('drop', dropEvent)
    cy.contains('button', 'Upload').click()
    cy.get('.UploadModelItem').should('have.length', 1)
  })

  it('selects material and provider', () => {
    cy.contains('button', 'Select').click()
    cy.contains('button', 'Select').click()
    cy.contains('button', 'Select').click()
    cy.contains('button', 'Select').click()
    cy.contains('button', 'Add to cart').click()
  })

  it('handles address form', () => {
    cy.contains('.headline', 'Shipping Address')
    cy.contains('button', 'Add Address').click()

    // Because label of InputField overlaps input we have to force the interactions here.
    cy.get('input[name="shippingAddress.firstName"]').type('TEST firstName', {force: true})
    cy.get('input[name="shippingAddress.lastName"]').type('TEST lastName', {force: true})
    cy.get('input[name="shippingAddress.address"]').type('TEST address', {force: true})
    cy.get('input[name="shippingAddress.city"]').type('TEST city', {force: true})
    cy.get('input[name="shippingAddress.zipCode"]').type('TEST zipCode', {force: true})
    cy.get('input[name="emailAddress"]').type('TEST@example.com', {force: true})
    cy.get('input[name="phoneNumber"]').type('0123456789', {force: true})

    cy.contains('button', 'Confirm').click()
  })

  it('pays per invoice', () => {
    cy.contains('.headline', 'Review Order')
    cy.contains('.CartModelItem', 'test-model.stl')

    cy.contains('button', 'Pay with Invoice').click()
  })

  it('reaches success page', () => {
    cy.contains('.headline', 'Thank you')
  })
})
