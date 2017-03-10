import {
  getMaterials,
  selectMaterial,
  selectMaterialConfig
} from 'Action/material'
import * as printingEngine from 'Lib/printing-engine'
import * as materialLib from 'Lib/material'
import Store from '../../../../src/app/store'

describe('Material Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(materialLib)

    store = Store({})
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(materialLib)
  })

  describe('getMaterials()', () => {
    it('should work', async () => {
      printingEngine.listMaterials.resolves('some-materials')
      materialLib.getDefaultMaterialConfigs
        .withArgs('some-materials')
        .resolves({some: 'configs'})

      await store.dispatch(getMaterials())

      expect(materialLib.generateMaterialIds, 'to have a call satisfying', ['some-materials'])
      expect(store.getState().material.materials, 'to equal', 'some-materials')
      expect(store.getState().material.selectedMaterialConfigs, 'to equal', {some: 'configs'})

      // Test call order because getDefaultMaterialConfigs
      // needs ids generated by generateMaterialIds
      expect([materialLib.generateMaterialIds, materialLib.getDefaultMaterialConfigs], 'given call order')
    })
  })

  describe('selectMaterial()', () => {
    it('should work', () => {
      store.dispatch(selectMaterial('some-material-id'))
      expect(store.getState().material.selectedMaterial, 'to equal', 'some-material-id')
    })
  })

  describe('selectMaterialConfig()', () => {
    it('should work', () => {
      store.dispatch(selectMaterialConfig('some-finish-group-id', 'some-config-id'))
      expect(
        store.getState().material.selectedMaterialConfigs,
        'to have own property',
        'some-finish-group-id',
        'some-config-id'
      )
    })
  })
})
