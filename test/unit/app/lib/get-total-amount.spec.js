import getTotalAmount from '../../../../src/app/lib/get-total-amount'

describe('getTotalAmount()', () => {
  it('works', () => {
    const cart = {
      items: [{
        price: 10,
        quantity: 2
      }],
      shipping: [{
        price: 5
      }],
      vatPercentage: 0.19
    }

    expect(getTotalAmount({cart}), 'to equal', 29.75)
  })
})
