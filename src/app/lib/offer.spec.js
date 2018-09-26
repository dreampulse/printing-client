import {getBestMultiModelOfferForMaterial, getBestMultiModelOffersForMaterialConfig} from './offer'

const usedShippingIds = []
const shippings = [
  {
    shippingId: 'shipping-id',
    vendorId: 'vendor-id',
    grossPrice: 10
  }
]
const quotes = [
  {
    grossPrice: 42,
    isPrintable: true,
    materialConfigId: 'material-config-1',
    vendorId: 'vendor-id'
  },
  {
    grossPrice: 23,
    isPrintable: true,
    materialConfigId: 'material-config-1',
    vendorId: 'vendor-id'
  },
  {
    grossPrice: 10,
    isPrintable: false,
    materialConfigId: 'material-config-1',
    vendorId: 'vendor-id'
  },
  {
    grossPrice: 2,
    isPrintable: true,
    materialConfigId: 'material-config-2',
    vendorId: 'vendor-id'
  }
]

describe('getBestMultiModelPriceForMaterialConfig()', () => {
  it('returns the sorted offer list for the material config only', () => {
    expect(
      getBestMultiModelOffersForMaterialConfig(
        quotes,
        usedShippingIds,
        shippings,
        'material-config-1'
      ),
      'to equal',
      [
        [quotes[1], shippings[0], quotes[1].grossPrice + shippings[0].grossPrice],
        [quotes[0], shippings[0], quotes[0].grossPrice + shippings[0].grossPrice]
      ]
    )
  })

  it('returns empty list if no quotes provided / matched', () => {
    expect(
      getBestMultiModelOffersForMaterialConfig([], usedShippingIds, shippings, 'material-config-1'),
      'to equal',
      []
    )
  })

  it('returns gross prices without shipping costs for used shipping ids', () => {
    expect(
      getBestMultiModelOffersForMaterialConfig(
        quotes,
        ['shipping-id'],
        shippings,
        'material-config-1'
      ),
      'to equal',
      [
        [quotes[1], shippings[0], quotes[1].grossPrice],
        [quotes[0], shippings[0], quotes[0].grossPrice]
      ]
    )
  })
})

describe('getBestMultiModelPriceForMaterial()', () => {
  const material = {
    finishGroups: [
      {
        materialConfigs: [
          {
            id: 'material-config-1'
          }
        ]
      },
      {
        materialConfigs: [
          {
            id: 'material-config-2'
          },
          {
            id: 'material-config-3'
          }
        ]
      }
    ]
  }

  it('returns the best offer for the material', () => {
    expect(
      getBestMultiModelOfferForMaterial(quotes, usedShippingIds, shippings, material),
      'to equal',
      [quotes[3], shippings[0], quotes[3].grossPrice + shippings[0].grossPrice]
    )
  })

  it('returns undefined if no quotes provided / matched', () => {
    expect(
      getBestMultiModelOfferForMaterial([], usedShippingIds, shippings, material),
      'to be undefined'
    )
  })
})
