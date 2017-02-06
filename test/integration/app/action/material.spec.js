import {getMaterials, selectMaterial} from '../../../../src/app/action/material'
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

  describe('getMaterials()', () => {
    it('should work', async () => {
      printingEngine.listMaterials.resolves('some-materials')

      await store.dispatch(getMaterials())
      expect(store.getState().material.materials, 'to equal', 'some-materials')
    })
  })

  describe('selectMaterial()', () => {
    it('should work', () => {
      store.dispatch(selectMaterial('some-material-id'))
      expect(store.getState().material.selectedIndex, 'to equal', 'some-material-id')
    })
  })
})
