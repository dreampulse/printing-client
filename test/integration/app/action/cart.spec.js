import * as cart from '../../../../src/app/action/cart'
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

  describe('selectOffer()', () => {
    it('should work', () => {
      store = Store({})

      store.dispatch(cart.selectOffer({offer: {
        some: 'offer'
      }}))

      expect(store.getState().cart.selectedOffer, 'to equal', {some: 'offer'})
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
