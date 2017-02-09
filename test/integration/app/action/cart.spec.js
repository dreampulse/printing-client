import * as cart from '../../../../src/app/action/cart'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as navigation from '../../../../src/app/action/navigation'

describe('Shopping Cart Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(navigation)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(navigation)
  })

  describe('selectOffer()', () => {
    it('should work', () => {
      store = Store({})
      navigation.goToAddress.returns({type: 'some-type'})

      store.dispatch(cart.selectOffer({
        vendor: 'some-vendor-id',
        shippingName: 'some-shipping-name'
      }))

      expect(store.getState().cart.selectedVendor, 'to equal', 'some-vendor-id')
      expect(store.getState().cart.selectedShipping, 'to equal', 'some-shipping-name')
      expect(navigation.goToAddress, 'was called once')
    })
  })


  describe('changeQuantity', () => {
    it('should work', () => {
      store = Store({})
      store.dispatch(cart.changeQuantity(2))
      expect(store.getState().cart.quantity, 'to equal', 2)
    })
  })
/*
  describe('createShoppingCart()', () => {
    it('should work', async () => {
      const modelId = '123'
      const priceId = '456'
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
        },
        cart: {
          quantity: 1
        }
      })

      printingEngine.createShoppingCart.resolves({cartId: 'some-cart-id'})
      printingEngine.getFinalCartPrice.resolves('final-cart-price')

      await store.dispatch(cart.createShoppingCart({modelId}))

      expect(store.getState().cart, 'to satisfy', {
        cartId: 'some-cart-id',
        cart: 'final-cart-price'
      })
    })
  })
  */
})
