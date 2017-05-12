import {
  getMaterials,
  selectMaterial,
  selectMaterialConfig,
  selectMaterialConfigForFinishGroup
} from 'Action/material'
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

    store = Store({})
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getMaterials()', () => {
    it('should work', async () => {
      printingEngine.listMaterials.resolves('some-materials')

      await store.dispatch(getMaterials())

      expect(materialLib.generateMaterialIds, 'to have a call satisfying', ['some-materials'])
      expect(store.getState().material.materials, 'to equal', 'some-materials')
    })
  })

  describe('selectMaterial()', () => {
    it('should work', () => {
      store.dispatch(selectMaterial('some-material-id'))
      expect(store.getState().material.selectedMaterial, 'to equal', 'some-material-id')
    })
  })

  describe('selectMaterialConfigForFinishGroup()', () => {
    it('should work', () => {
      store = Store({
        material: {
          selectedMaterialConfig: 'some-config-id'
        }
      })

      store.dispatch(selectMaterialConfigForFinishGroup({
        materialConfigId: 'some-config-id',
        finishGroupId: 'some-finish-group-id'
      }))

      expect(
        store.getState().material.selectedMaterialConfigs,
        'to have own property',
        'some-finish-group-id',
        'some-config-id'
      )

      // Has to reset selectedMaterialConfig
      expect(store.getState().material.selectedMaterialConfig, 'to be undefined')
    })
  })

  describe('selectMaterialConfig()', () => {
    it('should work', () => {
      store.dispatch(selectMaterialConfig('some-config-id'))
      expect(store.getState().material.selectedMaterialConfig, 'to equal', 'some-config-id')
    })
  })
})
