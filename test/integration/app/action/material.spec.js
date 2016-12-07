import { getMaterials } from '../../../../src/app/action/material'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Material Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)

    store = Store({})
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('createPriceRequest()', () => {
    it('should work', async () => {
      printingEngine.listMaterials.resolves('some-materials')

      await store.dispatch(getMaterials())
      expect(store.getState().material, 'to equal', 'some-materials')
    })
  })
})
