import cloneDeep from 'lodash/cloneDeep'
import {
  generateMaterialIds,
  hasMaterialMultipleConfigs,
  getBestOfferForMaterialConfig,
  getBestOfferForMaterial,
  getMaterialByName
} from '../../../../src/app/lib/material'
import materialResponse from '../../../../test-data/mock/material-list-response.json'

describe('generateMaterialIds()', () => {
  let materials

  beforeEach(() => {
    materials = cloneDeep(materialResponse)
  })

  it('adds ids to material groups', () => {
    generateMaterialIds(materials.materialStructure)
    expect(materials.materialStructure[0].id, 'to be defined')
  })

  it('adds unique ids to material groups', () => {
    generateMaterialIds(materials.materialStructure)
    expect(materials.materialStructure[0].id, 'not to equal', materials.materialStructure[1].id)
  })

  it('adds ids to materials', () => {
    generateMaterialIds(materials.materialStructure)
    expect(materials.materialStructure[0].materials[0].id, 'to be defined')
  })

  it('adds unique ids to materials', () => {
    generateMaterialIds(materials.materialStructure)
    expect(
      materials.materialStructure[0].materials[0].id,
      'not to equal',
      materials.materialStructure[0].materials[1].id
    )
  })

  it('adds ids to finish groups', () => {
    generateMaterialIds(materials.materialStructure)
    expect(materials.materialStructure[0].materials[0].finishGroups[0].id, 'to be defined')
  })

  it('adds unique ids to finish groups', () => {
    generateMaterialIds(materials.materialStructure)
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
      finishGroups: [
        {
          materialConfigs: [{some: 'config-1'}]
        },
        {
          materialConfigs: [{some: 'config-1'}, {some: 'config-2'}]
        }
      ]
    }
    expect(hasMaterialMultipleConfigs(material), 'to be', true)
  })

  it('returns false if no finish group has multiple configs', () => {
    const material = {
      finishGroups: [
        {
          materialConfigs: [{some: 'config-1'}]
        },
        {
          materialConfigs: [{some: 'config-1'}]
        }
      ]
    }
    expect(hasMaterialMultipleConfigs(material), 'to be', false)
  })
})

describe('getBestOfferForMaterialConfig()', () => {
  let offers

  beforeEach(() => {
    offers = [
      {
        materialConfigId: 'config-1',
        totalPrice: 20
      },
      {
        materialConfigId: 'config-2',
        totalPrice: 10
      },
      {
        materialConfigId: 'config-1',
        totalPrice: 10
      },
      {
        materialConfigId: 'config-1',
        totalPrice: 30
      }
    ]
  })

  it('returns cheapest offer for given material config', () => {
    const bestOffer = getBestOfferForMaterialConfig(offers, 'config-1')
    expect(bestOffer, 'to equal', {
      materialConfigId: 'config-1',
      totalPrice: 10
    })
  })
})

describe('getBestOfferForMaterial()', () => {
  let offers
  let material

  beforeEach(() => {
    offers = [
      {
        materialConfigId: 'config-1',
        totalPrice: 40
      },
      {
        materialConfigId: 'config-2',
        totalPrice: 30
      },
      {
        materialConfigId: 'config-3',
        totalPrice: 20
      },
      {
        materialConfigId: 'config-4',
        totalPrice: 10
      },
      {
        materialConfigId: 'config-1',
        totalPrice: 30
      }
    ]

    material = {
      finishGroups: [
        {
          materialConfigs: [
            {
              id: 'config-1'
            }
          ]
        },
        {
          materialConfigs: [
            {
              id: 'config-2'
            },
            {
              id: 'config-3'
            }
          ]
        }
      ]
    }
  })

  it('returns cheapest offer for given material', () => {
    const bestOffer = getBestOfferForMaterial(offers, material)
    expect(bestOffer, 'to equal', {
      materialConfigId: 'config-3',
      totalPrice: 20
    })
  })
})

describe('getMaterialByName()', () => {
  let materials

  beforeEach(() => {
    materials = {
      materialStructure: [
        {
          name: 'Group 1',
          materials: [
            {
              id: 'material-1',
              name: 'Material 1'
            }
          ]
        },
        {
          name: 'Group 2',
          materials: [
            {
              id: 'material-2',
              name: 'Material 2'
            },
            {
              id: 'material-3',
              name: 'Material 3'
            }
          ]
        }
      ]
    }
  })

  it('returns null if material cannot be found', () => {
    expect(getMaterialByName(materials, 'some-other-material'), 'to be', null)
  })

  it('returns expected material', () => {
    expect(getMaterialByName(materials, 'Material 3'), 'to equal', {
      id: 'material-3',
      name: 'Material 3'
    })
  })
})
