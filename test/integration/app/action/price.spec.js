import { createPriceRequest } from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as restApi from '../../../../src/app/lib/printing-engine/rest-api'


describe('Price Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(restApi)
  })

  afterEach(() => {
    sinon.restore(restApi)
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

      restApi.createUser.resolves({userId})
      restApi.createPriceRequest.resolves({priceId})
      restApi.listMaterials.resolves({'0':{}})

      await store.dispatch(createPriceRequest({modelId}))

      expect(store.getState().price, 'to equal', {
        priceId
      })
    })
  })

})
