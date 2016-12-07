import PriceAction from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../src/app/lib/printing-engine/printing-engine'

describe('Price Integration Test', () => {
  let price, store

  beforeEach(() => {
    store = Store({})
    price = PriceAction({printingEngine})
  })

  describe('createPriceRequest()', () => {
    it('should work', async () => {
      const foo = await store.dispatch(price.createPriceRequest())

      console.log("-- foo", foo);

      // expect(store.getState().model, 'to equal', {
      //   isUploadFinished: true,
      //   modelId
      // })
      // expect(printingEngine.pollUploadStatus, 'was called with', options)
    })
  })

})
