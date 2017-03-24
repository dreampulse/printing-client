import cloneDeep from 'lodash/cloneDeep'
import {
  generateMaterialIds,
  hasMaterialMultipleConfigs,
  getOffersForMaterialConfig,
  getBestOfferForMaterialConfig,
  getBestOfferForMaterial,
  getMaterialByName
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

describe('getOffersForMaterialConfig()', () => {
  let price
  let models

  beforeEach(() => {
    price = {
      items: [{
        materialConfigId: 'config-1',
        modelId: 'model-1'
      }, {
        materialConfigId: 'config-2',
        modelId: 'model-2'
      }],
      printingService: {
        imaterialize: {
          currency: 'USD',
          shipping: [{some: 'shipping-1'}, {some: 'shipping-2'}],
          vatPercentage: 0.19,
          items: [{
            isPrintable: true
          }, {
            isPrintable: true
          }]
        },
        shapeways: {
          currency: 'USD',
          shipping: [{some: 'shipping-1'}],
          vatPercentage: 0.19,
          items: [{
            isPrintable: true
          }, {
            isPrintable: true
          }]
        }
      }
    }

    models = {
      'model-1': {
        quantity: 1
      },
      'model-2': {
        quantity: 2
      }
    }
  })

  it('returns empty array if price is not given', () => {
    expect(getOffersForMaterialConfig('config-1', null), 'to equal', [])
  })

  it('returns expected offers', () => {
    expect(getOffersForMaterialConfig('config-1', price, models), 'to equal', [{
      name: 'imaterialize',
      items: [{isPrintable: true, quantity: 1}],
      shipping: {some: 'shipping-1'},
      vatPercentage: 0.19,
      currency: 'USD'
    }, {
      name: 'imaterialize',
      items: [{isPrintable: true, quantity: 1}],
      shipping: {some: 'shipping-2'},
      vatPercentage: 0.19,
      currency: 'USD'
    }, {
      name: 'shapeways',
      items: [{isPrintable: true, quantity: 1}],
      shipping: {some: 'shipping-1'},
      vatPercentage: 0.19,
      currency: 'USD'
    }])
  })

  it('filters out not printable and empty offers', () => {
    price.printingService.imaterialize.items = [{
      isPrintable: false
    }, {
      isPrintable: true
    }]
    price.printingService.shapeways.items = []

    expect(getOffersForMaterialConfig('config-1', price, models), 'to equal', [])
  })
})

describe('getBestOfferForMaterialConfig()', () => {
  let price
  let models

  beforeEach(() => {
    price = {
      items: [{
        materialConfigId: 'config-1',
        modelId: 'model-1'
      }, {
        materialConfigId: 'config-1',
        modelId: 'model-2'
      }],
      printingService: {
        imaterialize: {
          currency: 'USD',
          shipping: [{price: 10}, {price: 20}],
          vatPercentage: 0.1,
          items: [{
            isPrintable: true,
            price: 10
          }, {
            isPrintable: true,
            price: 10
          }]
        },
        shapeways: {
          currency: 'USD',
          shipping: [{price: 20}],
          vatPercentage: 0.1,
          items: [{
            isPrintable: true,
            price: 20
          }, {
            isPrintable: true,
            price: 20
          }]
        }
      }
    }

    models = {
      'model-1': {
        quantity: 1
      },
      'model-2': {
        quantity: 2
      }
    }
  })

  it('returns cheapest offer for given material config', () => {
    const bestOffer = getBestOfferForMaterialConfig('config-1', price, models)
    expect(bestOffer, 'to equal', {
      offer: {
        name: 'imaterialize',
        items: [{
          isPrintable: true,
          price: 10,
          quantity: 1
        }, {
          isPrintable: true,
          price: 10,
          quantity: 2
        }],
        shipping: {price: 10},
        vatPercentage: 0.1,
        currency: 'USD'
      },
      price: 44
    })
  })
})

describe('getBestOfferForMaterial()', () => {
  let price
  let material
  let models

  beforeEach(() => {
    price = {
      items: [{
        materialConfigId: 'config-1',
        modelId: 'model-1'
      }, {
        materialConfigId: 'config-1',
        modelId: 'model-2'
      }, {
        materialConfigId: 'config-2',
        modelId: 'model-1'
      }, {
        materialConfigId: 'config-2',
        modelId: 'model-2'
      }, {
        materialConfigId: 'config-3',
        modelId: 'model-1'
      }, {
        materialConfigId: 'config-3',
        modelId: 'model-2'
      }],
      printingService: {
        imaterialize: {
          currency: 'USD',
          shipping: [{price: 10}, {price: 20}],
          vatPercentage: 0.1,
          items: [{
            isPrintable: true,
            price: 20
          }, {
            isPrintable: true,
            price: 20
          }, {
            isPrintable: true,
            price: 10
          }, {
            isPrintable: true,
            price: 10
          }, {
            isPrintable: true,
            price: 10
          }, {
            isPrintable: false,
            price: 10
          }]
        },
        shapeways: {
          currency: 'USD',
          shipping: [{price: 20}],
          vatPercentage: 0.1,
          items: [{
            isPrintable: true,
            price: 20
          }, {
            isPrintable: true,
            price: 20
          }, {
            isPrintable: false,
            price: 30
          }, {
            isPrintable: true,
            price: 30
          }, {
            isPrintable: false,
            price: 40
          }, {
            isPrintable: true,
            price: 40
          }]
        }
      }
    }

    material = {
      finishGroups: [{
        materialConfigs: [{
          id: 'config-1'
        }]
      }, {
        materialConfigs: [{
          id: 'config-2'
        }, {
          id: 'config-3'
        }]
      }]
    }

    models = {
      'model-1': {
        quantity: 1
      },
      'model-2': {
        quantity: 2
      }
    }
  })

  it('returns cheapest offer for given material', () => {
    const bestOffer = getBestOfferForMaterial(material, price, models)
    expect(bestOffer, 'to equal', {
      offer: {
        name: 'imaterialize',
        items: [{
          isPrintable: true,
          price: 10,
          quantity: 1
        }, {
          isPrintable: true,
          price: 10,
          quantity: 2
        }],
        shipping: {price: 10},
        vatPercentage: 0.1,
        currency: 'USD'
      },
      price: 44
    })
  })
})

describe('getMaterialByName()', () => {
  let materials

  beforeEach(() => {
    materials = {
      materialStructure: [{
        name: 'Group 1',
        materials: [{
          id: 'material-1',
          name: 'Material 1'
        }]
      }, {
        name: 'Group 2',
        materials: [{
          id: 'material-2',
          name: 'Material 2'
        }, {
          id: 'material-3',
          name: 'Material 3'
        }]
      }]
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
