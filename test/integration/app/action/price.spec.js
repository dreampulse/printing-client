import { createPriceRequest } from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as geolocation from '../../../../src/app/service/geolocation'

describe('Price Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(geolocation)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(geolocation)
  })

  describe('createPriceRequest()', () => {
    it('should work', async () => {
      const modelId = '123'
      const priceId = '456'
      const userId = '789'
      const location = {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }

      store = Store({
        model: {
          modelId
        }
      })

      geolocation.getLocation.resolves(location)
      printingEngine.createUser.resolves({userId})
      printingEngine.createPriceRequest.resolves({priceId})
      printingEngine.listMaterials.resolves({'0': {}})
      printingEngine.getPriceStatus.resolves(true)
      printingEngine.getPrice.resolves('some-price')

      await store.dispatch(createPriceRequest({modelId}))

      expect(store.getState().price, 'to equal', {
        priceId,
        price: 'some-price'
      })
    })
  })
})
