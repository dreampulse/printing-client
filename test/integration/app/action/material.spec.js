import createHistory from 'history/createMemoryHistory'

import {getMaterials, selectMaterialConfig} from '../../../../src/app/action/material'
import * as printingEngine from '../../../../src/app/service/printing-engine'

describe('Material Integration Test', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine)

    store = createLegacyStore(createHistory())
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getMaterials()', () => {
    it('should work', async () => {
      const materialGroups = [1, 2, 3]
      printingEngine.listMaterials.resolves({materialStructure: materialGroups})

      await store.dispatch(getMaterials())

      expect(store.getState().material.materialGroups, 'to equal', materialGroups)
    })
  })

  describe('selectMaterialConfig()', () => {
    it('should work', () => {
      store.dispatch(selectMaterialConfig('some-config-id'))
      expect(store.getState().material.selectedMaterialConfig, 'to equal', 'some-config-id')
    })
  })
})
