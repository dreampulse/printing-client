import createHistory from 'history/createMemoryHistory'

import {getMaterials, selectMaterialConfig} from '../../../../src/app/action/material'
import * as printingEngine from '../../../../src/app/service/printing-engine'
import * as materialLib from '../../../../src/app/lib/material'

describe('Material Integration Test', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine)
    sandbox.stub(materialLib)

    store = createLegacyStore(createHistory())
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getMaterials()', () => {
    it('should work', async () => {
      const materialStructure = [1, 2, 3]
      const listMaterialsResult = {materialStructure}
      printingEngine.listMaterials.resolves(listMaterialsResult)

      await store.dispatch(getMaterials())

      expect(materialLib.generateMaterialIds, 'to have a call satisfying', [materialStructure])
      expect(store.getState().material.materials, 'to equal', listMaterialsResult)
    })
  })

  describe('selectMaterialConfig()', () => {
    it('should work', () => {
      store.dispatch(selectMaterialConfig('some-config-id'))
      expect(store.getState().material.selectedMaterialConfig, 'to equal', 'some-config-id')
    })
  })
})
