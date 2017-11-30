import createHistory from 'history/createMemoryHistory'

import {getMaterials, selectMaterialConfig} from 'Action/material'
import * as printingEngine from 'Lib/printing-engine'
import * as materialLib from 'Lib/material'
import Store from '../../../../src/app/store'

describe('Material Integration Test', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine)
    sandbox.stub(materialLib)

    store = Store(createHistory())
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
