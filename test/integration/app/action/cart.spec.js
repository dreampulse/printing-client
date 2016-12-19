import { createShoppingCart } from '../../../../src/app/action/cart'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Shopping Cart Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('createShoppingCart()', () => {
    it('should work', async () => {
      const modelId = '123'
      const priceId = '456'
      const userId = '789'
      const price = {
        _id: priceId,
        printingService: {
          shapeways: {
            shipping: [{
              name: 'USPS First-Class',
              price: 1.99
            }]
          }
        }
      }

      store = Store({
        model: {
          modelId
        },
        price: {
          priceId,
          price
        }
      })

      printingEngine.createUser.resolves({userId})
      printingEngine.createShoppingCart.resolves({cartId: 'some-cart-id'})
      printingEngine.getFinalCartPrice.resolves('final-cart-price')
      printingEngine.listMaterials.resolves({'0': {}})

      await store.dispatch(createShoppingCart({modelId}))

      expect(store.getState().cart, 'to equal', {
        cartId: 'some-cart-id',
        cartPrice: 'final-cart-price'
      })
    })
  })
})
