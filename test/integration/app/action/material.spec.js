import { getMaterials } from '../../../../src/app/action/material'
import Store from '../../../../src/app/store'
import * as restApi from '../../../../src/app/lib/printing-engine/rest-api'

describe('Material Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(restApi)

    store = Store({})
  })

  afterEach(() => {
    sinon.restore(restApi)
  })

  describe('createPriceRequest()', () => {
    it('should work', async () => {
      restApi.listMaterials.resolves('some-materials')

      await store.dispatch(getMaterials())
      expect(store.getState().material, 'to equal', 'some-materials')
    })
  })
})
