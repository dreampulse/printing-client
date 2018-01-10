import {
  hasMaterialMultipleConfigs,
  getBestOfferForMaterialConfig,
  getBestOfferForMaterial,
  getMaterialByName,
  getMaterialConfigIdsOfMaterialGroup
} from '../../../../src/app/lib/material'

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
  let materialGroups

  beforeEach(() => {
    materialGroups = [
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
  })

  it('returns null if material cannot be found', () => {
    expect(getMaterialByName(materialGroups, 'some-other-material'), 'to be', null)
  })

  it('returns expected material', () => {
    expect(getMaterialByName(materialGroups, 'Material 3'), 'to equal', {
      id: 'material-3',
      name: 'Material 3'
    })
  })
})

describe('getMaterialConfigIdsOfMaterialGroup()', () => {
  let materialGroup

  beforeEach(() => {
    materialGroup = {
      name: 'Group 1',
      materials: [
        {
          id: 'material-1',
          name: 'Material 1',
          finishGroups: [
            {
              materialConfigs: [{id: 'config-1'}]
            },
            {
              materialConfigs: [{id: 'config-2'}]
            }
          ]
        },
        {
          id: 'material-2',
          name: 'Material 2',
          finishGroups: [
            {
              materialConfigs: [{id: 'config-3'}]
            }
          ]
        }
      ]
    }
  })

  it('returns array of material config ids', () => {
    expect(getMaterialConfigIdsOfMaterialGroup(materialGroup), 'to equal', [
      'config-1',
      'config-2',
      'config-3'
    ])
  })
})
