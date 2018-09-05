import config from '../../../config'

import {
  hasMaterialMultipleConfigs,
  getMaterialByName,
  getMaterialById,
  getMaterialGroupById,
  getFinishGroupById,
  getMaterialConfigById,
  getMaterialConfigIdsOfMaterialGroup,
  getMaterialFinishGroupProviderNames,
  getMaterialTreeByMaterialConfigId,
  getProviderName
} from './material'

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

describe('getFinishGroupById()', () => {
  it('returns matching finish groups', () => {
    const materialGroups = [
      {
        materials: [
          {
            finishGroups: [
              {
                id: 'some-finish-group-id-1'
              },
              {
                id: 'some-finish-group-id-2'
              }
            ]
          }
        ]
      }
    ]

    expect(getFinishGroupById(materialGroups, 'some-finish-group-id-1'), 'to equal', {
      id: 'some-finish-group-id-1'
    })
  })

  it('returns null for no match', () => {
    const materialGroups = [
      {
        materials: [
          {
            finishGroups: [
              {
                id: 'some-finish-group-id-1'
              },
              {
                id: 'some-finish-group-id-2'
              }
            ]
          }
        ]
      }
    ]

    expect(getFinishGroupById(materialGroups, 'some-finish-group-id-3'), 'to equal', null)
  })
})

describe('getMaterialConfigById()', () => {
  it('returns matching material config', () => {
    const materialGroups = [
      {
        materials: [
          {
            finishGroups: [
              {
                materialConfigs: [
                  {
                    id: 'material-config-1'
                  },
                  {
                    id: 'material-config-2'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    expect(getMaterialConfigById(materialGroups, 'material-config-1'), 'to equal', {
      id: 'material-config-1'
    })
  })

  it('returns null for no match', () => {
    const materialGroups = [
      {
        materials: [
          {
            finishGroups: [
              {
                materialConfigs: [
                  {
                    id: 'material-config-1'
                  },
                  {
                    id: 'material-config-2'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    expect(getMaterialConfigById(materialGroups, 'material-config-3'), 'to equal', null)
  })
})

describe('getMaterialTreeByMaterialConfigId()', () => {
  it('returns the matching material tree', () => {
    const materialGroups = [
      {
        materials: [
          {
            finishGroups: [
              {
                materialConfigs: [
                  {
                    id: 'some-material-config-id-1'
                  },
                  {
                    id: 'some-material-config-id-2'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    expect(
      getMaterialTreeByMaterialConfigId(materialGroups, 'some-material-config-id-2'),
      'to satisfy',
      {
        material: expect.it('to be', materialGroups[0].materials[0]),
        finishGroup: expect.it('to be', materialGroups[0].materials[0].finishGroups[0]),
        materialConfig: expect.it(
          'to be',
          materialGroups[0].materials[0].finishGroups[0].materialConfigs[1]
        )
      }
    )
  })
})

describe('getProviderName()', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'providerNames').value({'some-vendor-id': 'some-vendor-name'})
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns the provider name from the config', () => {
    expect(getProviderName('some-vendor-id'), 'to equal', 'some-vendor-name')
  })

  it('returns the vendor id if not found in the config', () => {
    expect(getProviderName('some-unknown-vendor-id'), 'to equal', 'some-unknown-vendor-id')
  })
})
