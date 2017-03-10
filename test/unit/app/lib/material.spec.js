import cloneDeep from 'lodash/cloneDeep'
import {
  generateMaterialIds,
  hasMaterialMultipleConfigs,
  getDefaultMaterialConfigs
} from 'Lib/material'
import materialResponse from '../../../../test-data/mock/material-list-response.json'

describe('generateMaterialIds()', () => {
  let materials

  beforeEach(() => {
    materials = cloneDeep(materialResponse)
  })

  it('adds ids to material groups', () => {
    generateMaterialIds(materials)
    expect(materials.materialStructure[0].id, 'to be defined')
  })

  it('adds unique ids to material groups', () => {
    generateMaterialIds(materials)
    expect(
      materials.materialStructure[0].id,
      'not to equal',
      materials.materialStructure[1].id
    )
  })

  it('adds ids to materials', () => {
    generateMaterialIds(materials)
    expect(materials.materialStructure[0].materials[0].id, 'to be defined')
  })

  it('adds unique ids to materials', () => {
    generateMaterialIds(materials)
    expect(
      materials.materialStructure[0].materials[0].id,
      'not to equal',
      materials.materialStructure[0].materials[1].id
    )
  })

  it('adds ids to finish groups', () => {
    generateMaterialIds(materials)
    expect(materials.materialStructure[0].materials[0].finishGroups[0].id, 'to be defined')
  })

  it('adds unique ids to finish groups', () => {
    generateMaterialIds(materials)
    expect(
      materials.materialStructure[0].materials[0].finishGroups[0].id,
      'not to equal',
      materials.materialStructure[0].materials[0].finishGroups[1].id
    )
  })
})

describe('hasMaterialMultipleConfigs()', () => {
  it('returns true if at least one finish group has multiple configs', () => {
    const material = {
      finishGroups: [{
        materialConfigs: [{some: 'config-1'}]
      }, {
        materialConfigs: [{some: 'config-1'}, {some: 'config-2'}]
      }]
    }
    expect(hasMaterialMultipleConfigs(material), 'to be', true)
  })

  it('returns false if no finish group has multiple configs', () => {
    const material = {
      finishGroups: [{
        materialConfigs: [{some: 'config-1'}]
      }, {
        materialConfigs: [{some: 'config-1'}]
      }]
    }
    expect(hasMaterialMultipleConfigs(material), 'to be', false)
  })
})

describe('getDefaultMaterialConfigs()', () => {
  it('returns map with default configs for all finishGroups', () => {
    const materials = {
      materialStructure: [{
        id: 'group-0',
        materials: [{
          id: 'material-0',
          finishGroups: [{
            id: 'finish-group-0',
            materialConfigs: [{id: 'config-0'}, {id: 'other-config'}]
          }, {
            id: 'finish-group-1',
            materialConfigs: [{id: 'config-1'}, {id: 'other-config'}]
          }]
        }]
      }]
    }

    expect(getDefaultMaterialConfigs(materials), 'to equal', {
      'finish-group-0': 'config-0',
      'finish-group-1': 'config-1'
    })
  })
})
