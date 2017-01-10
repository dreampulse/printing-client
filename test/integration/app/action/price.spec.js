import { createPriceRequest, selectVendor } from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as navigation from '../../../../src/app/action/navigation'

describe('Price Integration Test', () => {
  let store

  const modelId = '123'
  const priceId = '456'
  const userId = '789'
  const shippingAddress = {
    city: 'Pittsburgh',
    zipCode: '15234',
    stateCode: 'PA',
    countryCode: 'US'
  }

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(navigation)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(navigation)
  })

  describe('createPriceRequest()', () => {
    it('should work if shipping address is set', async () => {
      store = Store({
        model: {
          modelId
        },
        user: {
          user: {
            shippingAddress
          }
        }
      })

      printingEngine.createUser.resolves({ userId })
      printingEngine.createPriceRequest.resolves({ priceId })
      printingEngine.listMaterials.resolves({'0': {}})
      printingEngine.getPriceStatus.resolves(true)
      printingEngine.getPrice.resolves('some-price')

      await store.dispatch(createPriceRequest())

      expect(store.getState().price, 'to satisfy', {
        priceId,
        price: 'some-price'
      })
    })

    it('should not send request if shipping address is not set', async () => {
      store = Store({})

      await store.dispatch(createPriceRequest())

      expect(printingEngine.createUser, 'was not called')
      expect(store.getState().price, 'to satisfy', {
        priceId: null,
        price: null
      })
    })
  })

  describe('selectVendor', () => {
    it('should work', () => {
      navigation.goToCart.returns({type: 'foo'})

      store = Store({})
      store.dispatch(selectVendor('some-vendor-id'))
      expect(store.getState().price.selectedVendor, 'to equal', 'some-vendor-id')
      expect(navigation.goToCart, 'was called once')
    })
  })
})
