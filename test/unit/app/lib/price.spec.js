import {
  getCartAmount,
  getOfferAmount
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

describe('getOfferAmount()', () => {
  it('returns expected amount', () => {
    const offer = {
      items: [{
        price: 10,
        quantity: 1
      }, {
        price: 20,
        quantity: 2
      }],
      shipping: {
        price: 10
      },
      vatPercentage: 0.1
    }

    expect(getOfferAmount(offer), 'to equal', 66)
  })
})
