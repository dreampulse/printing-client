import {
  selectMaterialMenuValues,
  selectCurrentMaterial,
  selectOffers,
  selectPrintingServiceRequests
} from 'Lib/selector'

describe('selectOffers()', () => {
  let price
  let state

  beforeEach(() => {
    price = {
      items: [{
        materialConfigId: 'some-config-id',
        modelId: 'some-model-id'
      }, {
        materialConfigId: 'some-other-config-id',
        modelId: 'some-other-model-id'
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

    state = {
      price: {
        price
      },
      material: {
        selectedMaterialConfig: 'some-config-id'
      }
    }
  })

  it('returns expected offers', () => {
    expect(selectOffers(state), 'to equal', [{
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

  it('returns empty array if price object is missing', () => {
    state.price.price = null
    expect(selectOffers(state), 'to equal', [])
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

