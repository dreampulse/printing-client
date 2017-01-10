import { getCartAmount, getPriceAmount } from '../../../../src/app/lib/get-total-amount'

describe('getCartAmount()', () => {
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

    expect(getCartAmount(cart), 'to equal', 29.75)
  })
})

describe('getPriceAmount()', () => {
  it('works', () => {
    const cart = {
      items: [{
        price: 10
      }],
      shipping: [
        { price: 5 },
        { price: 6 }
      ],
      vatPercentage: 0.19
    }

    expect(getPriceAmount(cart), 'to equal', 17.85)
  })
})
