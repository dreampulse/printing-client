import {
  selectMaterialMenuValues,
  selectCurrentMaterial,
  selectOffers,
  selectPrintingServiceRequests
} from 'Lib/selector'
import * as materialLib from 'Lib/material'

describe('selectMaterialMenuValues()', () => {
  let price
  let materials
  let material1
  let material2
  let material3

  beforeEach(() => {
    sinon.stub(materialLib)

    material1 = {
      id: 'material-1',
      name: 'Material 1'
    }
    material2 = {
      id: 'material-2',
      name: 'Material 2'
    }
    material3 = {
      id: 'material-3',
      name: 'Material 3'
    }

    price = {some: 'price'}
    materials = {
      materialStructure: [{
        name: 'Group 1',
        materials: [material1]
      }, {
        name: 'Group 2',
        materials: [material2, material3]
      }]
    }
  })

  afterEach(() => {
    sinon.restore(materialLib)
  })

  it('returns expected material menu values', () => {
    materialLib.getBestOfferForMaterial
      .withArgs(material1, price)
      .returns({
        price: 10,
        offer: {currency: 'USD'}
      })
    materialLib.getBestOfferForMaterial
      .withArgs(material2, price)
      .returns(null)
    materialLib.getBestOfferForMaterial
      .withArgs(material3, price)
      .returns(null)

    materialLib.hasMaterialMultipleConfigs.withArgs(material1).returns(true)
    materialLib.hasMaterialMultipleConfigs.withArgs(material2).returns(false)
    materialLib.hasMaterialMultipleConfigs.withArgs(material3).returns(false)

    const state = {
      price: {
        price
      },
      material: {
        materials
      }
    }

    const menuValues = selectMaterialMenuValues(state)

    expect(menuValues, 'to equal', [{
      type: 'group',
      label: 'Group 1',
      children: [{
        type: 'material',
        value: 'material-1',
        label: 'Material 1',
        hasColor: true,
        price: 'From 10.00 USD'
      }]
    }, {
      type: 'group',
      label: 'Group 2',
      children: [{
        type: 'material',
        value: 'material-2',
        label: 'Material 2',
        hasColor: false,
        price: undefined
      }, {
        type: 'material',
        value: 'material-3',
        label: 'Material 3',
        hasColor: false,
        price: undefined
      }]
    }])
  })

  it('returns empty array if there are no materials in state', () => {
    const state = {
      price: {
        price
      },
      material: {
        materials: undefined
      }
    }

    expect(selectMaterialMenuValues(state), 'to equal', [])
  })

  it('returns empty array if materialStructure is undefined', () => {
    materials.materialStructure = undefined
    const state = {
      price: {
        price
      },
      material: {
        materials
      }
    }

    expect(selectMaterialMenuValues(state), 'to equal', [])
  })
})

describe('selectCurrentMaterial()', () => {
  let materials

  beforeEach(() => {
    materials = {
      materialStructure: [{
        materials: []
      }, {
        materials: [{
          id: 'material-1'
        }, {
          id: 'material-2'
        }]
      }]
    }
  })

  it('returns expected material', () => {
    const state = {
      material: {
        materials,
        selectedMaterial: 'material-2'
      }
    }

    expect(selectCurrentMaterial(state), 'to equal', {id: 'material-2'})
  })

  it('returns null if there are no materials in state', () => {
    const state = {
      material: {
        materials: undefined,
        selectedMaterial: 'material-2'
      }
    }

    expect(selectCurrentMaterial(state), 'to be', null)
  })

  it('returns null if materialStructure is undefined', () => {
    materials.materialStructure = undefined
    const state = {
      material: {
        materials,
        selectedMaterial: undefined
      }
    }

    expect(selectCurrentMaterial(state), 'to be', null)
  })
})

describe('selectOffers()', () => {
  let price
  let state

  beforeEach(() => {
    sinon.stub(materialLib)

    price = {some: 'price'}
    state = {
      price: {
        price
      },
      material: {
        selectedMaterialConfig: 'some-config-id'
      }
    }
  })

  afterEach(() => {
    sinon.restore(materialLib)
  })

  it('returns expected offers', () => {
    materialLib.getOffersForMaterialConfig
      .withArgs('some-config-id', price)
      .returns(['some-offers'])

    expect(selectOffers(state), 'to equal', ['some-offers'])
  })
})

describe('selectPrintingServiceRequests()', () => {
  let price
  let state

  beforeEach(() => {
    price = {
      printingService: {
        imaterialize: {
          requestComplete: false
        },
        shapeways: {
          requestComplete: true
        }
      }
    }

    state = {
      price: {
        price
      }
    }
  })

  it('returns expected counts', () => {
    expect(selectPrintingServiceRequests(state), 'to equal', {
      complete: 1,
      total: 2
    })
  })

  it('returns null if price object is missing', () => {
    state.price.price = null
    expect(selectPrintingServiceRequests(state), 'to equal', null)
  })
})

