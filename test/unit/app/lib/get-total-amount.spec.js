import {getCartAmount, getPriceAmount} from 'Lib/get-total-amount'

describe('getCartAmount()', () => {
  it('works as expected', () => {
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
  it('returns expected price', () => {
    const offer = {
      items: [{
        price: 10,
        isPrintable: true
      }, {
        price: 15,
        isPrintable: true
      }],
      shipping: {
        price: 5
      },
      vatPercentage: 0.19
    }

    expect(getPriceAmount(offer), 'to equal', 35.7)
  })
})
