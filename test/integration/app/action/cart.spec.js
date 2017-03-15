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

  describe('createShoppingCart()', () => {
    it('should work', async () => {
      store = Store({
        material: {
          selectedMaterial: 'some-material-id'
        },
        model: {
          models: {
            'some-model-id': {
              modelId: 'some-model-id',
              quantity: 23
            },
            'some-other-model-id': {
              modelId: 'some-other-model-id',
              quantity: 42
            }
          }
        },
        price: {
          priceId: 'some-price-id'
        },
        cart: {
          selectedVendor: 'some-vendor',
          selectedShipping: 'some-shipping-method'
        }
      })

      printingEngine.createShoppingCart.resolves({cartId: 'some-cart-id'})
      printingEngine.getFinalCartPrice.resolves('final-cart-price')

      await store.dispatch(cart.createShoppingCart())

      expect(store.getState().cart, 'to satisfy', {
        cartId: 'some-cart-id',
        cart: 'final-cart-price'
      })

      expect(printingEngine.createShoppingCart, 'was called with', {
        userId: null,
        priceId: 'some-price-id',
        items: [{
          modelId: 'some-model-id',
          vendorId: 'some-vendor',
          quantity: 23,
          materialId: 'some-material-id'
        }, {
          modelId: 'some-other-model-id',
          vendorId: 'some-vendor',
          quantity: 42,
          materialId: 'some-material-id'
        }],
        shipping: [{
          name: 'some-shipping-method',
          vendorId: 'some-vendor'
        }, {
          name: 'some-shipping-method',
          vendorId: 'some-vendor'
        }]
      })

      expect(printingEngine.getFinalCartPrice, 'was called with', {
        cartId: 'some-cart-id'
      })
    })
  })
})
