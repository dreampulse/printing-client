import { createPriceRequest } from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

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
  })

  afterEach(() => {
    sinon.restore(printingEngine)
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

      expect(store.getState().price, 'to equal', {
        priceId,
        price: 'some-price'
      })
    })

    it('should not send request if shipping address is not set', async () => {
      store = Store({})

      await store.dispatch(createPriceRequest())

      expect(printingEngine.createUser, 'was not called')
      expect(store.getState().price, 'to equal', {
        priceId: null,
        price: null
      })
    })
  })
})
