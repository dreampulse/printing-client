import {
  getCartAmount
} from 'Lib/price'

describe('getCartAmount()', () => {
  it('returns expected amount', () => {
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

    expect(getCartAmount(cart), 'to equal', 29.75)
  })
})
