import { createPriceRequest } from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Price Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('createPriceRequest()', () => {
    it('should work', async () => {
      const modelId = '123'
      const priceId = '456'
      const userId = '789'

      store = Store({
        model: {
          modelId
        }
      })

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
