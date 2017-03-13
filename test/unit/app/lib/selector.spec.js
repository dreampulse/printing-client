import {
  selectMaterialMenuValues,
  selectCurrentMaterial,
  selectOffers
} from 'Lib/selector'

describe('selectOffers()', () => {
  let price
  let state

  beforeEach(() => {
    price = {
      items: [{
        materialId: 'some-config-id',
        modelId: 'some-model-id'
      }, {
        materialId: 'some-other-config-id',
        modelId: 'some-other-model-id'
      }],
      printingService: {
        imaterialize: {
          currency: 'USD',
          shipping: [{some: 'shipping-1'}, {some: 'shipping-2'}],
          vatPercentage: 0.19,
          items: [{}, {}]
        },
        shapeways: {
          currency: 'USD',
          shipping: [{some: 'shipping-1'}],
          vatPercentage: 0.19,
          items: [{}, {}]
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
      items: [{}],
      shipping: {some: 'shipping-1'},
      vatPercentage: 0.19,
      currency: 'USD'
    }, {
      name: 'imaterialize',
      items: [{}],
      shipping: {some: 'shipping-2'},
      vatPercentage: 0.19,
      currency: 'USD'
    }, {
      name: 'shapeways',
      items: [{}],
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
