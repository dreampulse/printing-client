import {
  hasMaterialMultipleConfigs,
  // getBestOfferForMaterialConfig,
  // getBestOfferForMaterial,
  getMaterialByName,
  getMaterialById,
  getMaterialGroupById,
  getMaterialConfigIdsOfMaterialGroup,
  getMaterialFinishGroupProviderNames
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

/*
describe('getBestOfferForMaterialConfig()', () => {
  let offers

  beforeEach(() => {
    offers = [
      {
        materialConfigId: 'config-1',
        subTotalPrice: 20
      },
      {
        materialConfigId: 'config-2',
        subTotalPrice: 10
      },
      {
        materialConfigId: 'config-1',
        subTotalPrice: 10
      },
      {
        materialConfigId: 'config-1',
        subTotalPrice: 30
      }
    ]
  })

  it('returns cheapest offer for given material config', () => {
    const bestOffer = getBestOfferForMaterialConfig(offers, 'config-1')
    expect(bestOffer, 'to equal', {
      materialConfigId: 'config-1',
      subTotalPrice: 10
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
        subTotalPrice: 40
      },
      {
        materialConfigId: 'config-2',
        subTotalPrice: 30
      },
      {
        materialConfigId: 'config-3',
        subTotalPrice: 20
      },
      {
        materialConfigId: 'config-4',
        subTotalPrice: 10
      },
      {
        materialConfigId: 'config-1',
        subTotalPrice: 30
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
      subTotalPrice: 20
    })
  })
})
*/

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

describe('getMaterialById()', () => {
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
    expect(getMaterialById(materialGroups, 'some-other-material'), 'to be', null)
  })

  it('returns expected material', () => {
    expect(getMaterialById(materialGroups, 'material-3'), 'to equal', {
      id: 'material-3',
      name: 'Material 3'
    })
  })
})

describe('getMaterialGroupById()', () => {
  let materialGroups

  beforeEach(() => {
    materialGroups = [
      {
        id: 'group-1',
        name: 'Group 1',
        materials: [
          {
            id: 'material-1',
            name: 'Material 1'
          }
        ]
      },
      {
        id: 'group-2',
        name: 'Group 2',
        materials: [
          {
            id: 'material-2',
            name: 'Material 2'
          }
        ]
      }
    ]
  })

  it('returns null if material cannot be found', () => {
    expect(getMaterialGroupById(materialGroups, 'some-other-group'), 'to be', null)
  })

  it('returns expected material', () => {
    expect(getMaterialGroupById(materialGroups, 'group-2'), 'to equal', {
      id: 'group-2',
      name: 'Group 2',
      materials: [
        {
          id: 'material-2',
          name: 'Material 2'
        }
      ]
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

describe('getMaterialFinishGroupProviderNames()', () => {
  let material
  let result

  beforeEach(() => {
    material = {
      finishGroups: [
        {
          properties: {
            printingServiceName: {
              printingServiceSlug1: 'name1',
              printingServiceSlug2: 'name2'
            }
          }
        },
        {
          properties: {
            printingServiceName: {
              printingServiceSlug1: 'name4',
              printingServiceSlug2: 'name2',
              printingServiceSlug3: 'name5'
            }
          }
        }
      ]
    }

    result = getMaterialFinishGroupProviderNames(material)
  })

  it('returns a unique list of printing service names', () => {
    expect(result, 'to equal', {
      printingServiceSlug1: ['name1', 'name4'],
      printingServiceSlug2: ['name2'],
      printingServiceSlug3: ['name5']
    })
  })
})
