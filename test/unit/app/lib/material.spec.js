import cloneDeep from 'lodash/cloneDeep'
import {
  generateMaterialIds,
  hasMaterialMultipleConfigs,
  getOffersForMaterialConfig,
  getBestOfferForMaterialConfig,
  getBestOfferForMaterial
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
  })

  it('returns empty array if price is not given', () => {
    expect(getOffersForMaterialConfig('config-1', null), 'to equal', [])
  })

  it('returns expected offers', () => {
    expect(getOffersForMaterialConfig('config-1', price), 'to equal', [{
      name: 'imaterialize',
      items: [{isPrintable: true}],
      shipping: {some: 'shipping-1'},
      vatPercentage: 0.19,
      currency: 'USD'
    }, {
      name: 'imaterialize',
      items: [{isPrintable: true}],
      shipping: {some: 'shipping-2'},
      vatPercentage: 0.19,
      currency: 'USD'
    }, {
      name: 'shapeways',
      items: [{isPrintable: true}],
      shipping: {some: 'shipping-1'},
      vatPercentage: 0.19,
      currency: 'USD'
    }])
  })

  it('filters out not printable offers', () => {
    price.printingService.imaterialize.items = [{
      isPrintable: false
    }, {
      isPrintable: true
    }]

    expect(getOffersForMaterialConfig('config-1', price), 'to equal', [{
      name: 'shapeways',
      items: [{isPrintable: true}],
      shipping: {some: 'shipping-1'},
      vatPercentage: 0.19,
      currency: 'USD'
    }])
  })
})

describe('getBestOfferForMaterialConfig()', () => {
  let price

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
  })

  it('returns cheapest offer for given material config', () => {
    const bestOffer = getBestOfferForMaterialConfig('config-1', price)
    expect(bestOffer, 'to equal', {
      offer: {
        name: 'imaterialize',
        items: [{
          isPrintable: true,
          price: 10
        }, {
          isPrintable: true,
          price: 10
        }],
        shipping: {price: 10},
        vatPercentage: 0.1,
        currency: 'USD'
      },
      price: 33
    })
  })
})

describe('getBestOfferForMaterial()', () => {
  let price
  let material

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
  })

  it('returns cheapest offer for given material', () => {
    const bestOffer = getBestOfferForMaterial(material, price)
    expect(bestOffer, 'to equal', {
      offer: {
        name: 'imaterialize',
        items: [{
          isPrintable: true,
          price: 10
        }, {
          isPrintable: true,
          price: 10
        }],
        shipping: {price: 10},
        vatPercentage: 0.1,
        currency: 'USD'
      },
      price: 33
    })
  })
})
