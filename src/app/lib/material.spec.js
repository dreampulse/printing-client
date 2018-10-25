import config from '../../../config'

import {
  getProviderName,
  getMaterialGroupLookupTable,
  getMaterialLookupTable,
  getFinishGroupLookupTable,
  getMaterialConfigLookupTable
} from './material'

describe('getMaterialGroupLookupTable()', () => {
  it('returns map of material groups', () => {
    const materialGroups = [
      {
        id: 'material-group-1'
      },
      {
        id: 'material-group-2'
      }
    ]

    expect(getMaterialGroupLookupTable(materialGroups), 'to equal', {
      'material-group-1': {id: 'material-group-1'},
      'material-group-2': {id: 'material-group-2'}
    })
  })
})

describe('getMaterialLookupTable()', () => {
  it('returns map of materials', () => {
    const materialGroups = [
      {
        materials: [
          {
            id: 'material-1'
          },
          {
            id: 'material-2'
          }
        ]
      }
    ]

    expect(getMaterialLookupTable(materialGroups), 'to equal', {
      'material-1': {id: 'material-1'},
      'material-2': {id: 'material-2'}
    })
  })
})

describe('getFinishGroupLookupTable()', () => {
  it('returns map of finish groups', () => {
    const materialGroups = [
      {
        materials: [
          {
            finishGroups: [
              {
                id: 'finish-group-1'
              },
              {
                id: 'finish-group-2'
              }
            ]
          }
        ]
      }
    ]

    expect(getFinishGroupLookupTable(materialGroups), 'to equal', {
      'finish-group-1': {id: 'finish-group-1'},
      'finish-group-2': {id: 'finish-group-2'}
    })
  })
})

describe('getMaterialConfigLookupTable()', () => {
  it('returns map of material configs', () => {
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

    expect(getMaterialConfigLookupTable(materialGroups), 'to equal', {
      'material-config-1': {id: 'material-config-1'},
      'material-config-2': {id: 'material-config-2'}
    })
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
