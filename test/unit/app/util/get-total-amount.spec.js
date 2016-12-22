import getTotalAmount from '../../../../src/app/util/get-total-amount'

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
      vatPercentage: 0.5
    }

    expect(getTotalAmount({cart}), 'to equal', 12.5)
  })
})
