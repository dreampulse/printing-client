import URLSearchParams from 'url-search-params'
import {
  selectCommonQuantity,
  selectMaterialMenuValues,
  selectMaterial,
  selectMaterialByName,
  selectFinishGroup,
  selectCurrentMaterial,
  selectOffersForSelectedMaterialConfig,
  selectPrintingServiceRequests,
  selectMaterialByMaterialConfigId,
  selectedOfferMaterial,
  selectModelByModelId,
  selectOfferItems,
  selectAreAllUploadsFinished,
  selectFeatures,
  selectLocationQuery
} from 'Lib/selector'
import * as materialLib from 'Lib/material'
import config from '../../../../config'

describe('Selector lib', () => {
  describe('selectCommonQuantity', () => {
    it('returns common quantity if all individual model quantities are the same', () => {
      const state = {
        model: {
          models: [{quantity: 2}, {quantity: 2}]
        }
      }

      expect(selectCommonQuantity(state), 'to equal', 2)
    })

    it('returns undefined if not all individual model quantities are the same', () => {
      const state = {
        model: {
          models: [{quantity: 2}, {quantity: 1}]
        }
      }

      expect(selectCommonQuantity(state), 'to be', undefined)
    })

    it('returns undefined if there are no models', () => {
      const state = {
        model: {
          models: []
        }
      }

      expect(selectCommonQuantity(state), 'to be', undefined)
    })
  })

  describe('selectMaterialMenuValues()', () => {
    let sandbox
    let offers
    let materials
    let material1
    let material2
    let material3

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      sandbox.stub(materialLib)

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

      offers = ['some', 'offers']
      materials = {
        materialStructure: [
          {
            name: 'Group 1',
            materials: [material1]
          },
          {
            name: 'Group 2',
            materials: [material2, material3]
          }
        ]
      }
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('returns expected material menu values', () => {
      materialLib.getBestOfferForMaterial.withArgs(offers, material1).returns({
        totalPrice: 10,
        currency: 'USD'
      })
      materialLib.getBestOfferForMaterial.withArgs(offers, material2).returns(null)
      materialLib.getBestOfferForMaterial.withArgs(offers, material3).returns(null)

      materialLib.hasMaterialMultipleConfigs.withArgs(material1).returns(true)
      materialLib.hasMaterialMultipleConfigs.withArgs(material2).returns(false)
      materialLib.hasMaterialMultipleConfigs.withArgs(material3).returns(false)

      const state = {
        price: {
          offers
        },
        material: {
          materials
        }
      }

      const menuValues = selectMaterialMenuValues(state)

      expect(menuValues, 'to equal', [
        {
          type: 'group',
          label: 'Group 1',
          children: [
            {
              type: 'material',
              value: 'material-1',
              label: 'Material 1',
              hasColor: true,
              price: 'From 10.00 $'
            }
          ]
        },
        {
          type: 'group',
          label: 'Group 2',
          children: [
            {
              type: 'material',
              value: 'material-2',
              label: 'Material 2',
              hasColor: false,
              price: undefined
            },
            {
              type: 'material',
              value: 'material-3',
              label: 'Material 3',
              hasColor: false,
              price: undefined
            }
          ]
        }
      ])
    })

    it('returns material menu values without price when offers are null', () => {
      materialLib.hasMaterialMultipleConfigs.returns(false)

      const state = {
        price: {
          offers: null
        },
        material: {
          materials
        }
      }

      const menuValues = selectMaterialMenuValues(state)

      expect(menuValues, 'to equal', [
        {
          type: 'group',
          label: 'Group 1',
          children: [
            {
              type: 'material',
              value: 'material-1',
              label: 'Material 1',
              hasColor: false,
              price: undefined
            }
          ]
        },
        {
          type: 'group',
          label: 'Group 2',
          children: [
            {
              type: 'material',
              value: 'material-2',
              label: 'Material 2',
              hasColor: false,
              price: undefined
            },
            {
              type: 'material',
              value: 'material-3',
              label: 'Material 3',
              hasColor: false,
              price: undefined
            }
          ]
        }
      ])
    })

    it('returns empty array if there are no materials in state', () => {
      const state = {
        price: {
          offers
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
          offers
        },
        material: {
          materials
        }
      }

      expect(selectMaterialMenuValues(state), 'to equal', [])
    })
  })

  describe('selectMaterial()', () => {
    let materials

    beforeEach(() => {
      materials = {
        materialStructure: [
          {
            materials: []
          },
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
      }
    })

    it('returns expected material', () => {
      const state = {
        material: {materials}
      }

      expect(selectMaterial(state, 'material-2'), 'to equal', {id: 'material-2'})
    })

    it('returns null if there are no materials in state', () => {
      const state = {
        material: {
          materials: undefined
        }
      }

      expect(selectMaterial(state, 'material-2'), 'to be', null)
    })

    it('returns null if materialStructure is undefined', () => {
      materials.materialStructure = undefined
      const state = {
        material: {materials}
      }

      expect(selectMaterial(state, 'material-2'), 'to be', null)
    })
  })

  describe('selectMaterialByName()', () => {
    let materials

    beforeEach(() => {
      materials = {
        materialStructure: [
          {
            materials: []
          },
          {
            materials: [
              {
                id: 'material-1',
                name: 'Material 1'
              },
              {
                id: 'material-2',
                name: 'Material 2'
              }
            ]
          }
        ]
      }
    })

    it('returns expected material', () => {
      const state = {
        material: {materials}
      }

      expect(selectMaterialByName(state, 'Material 2'), 'to equal', {
        id: 'material-2',
        name: 'Material 2'
      })
    })

    it('returns null if there are no materials in state', () => {
      const state = {
        material: {
          materials: undefined
        }
      }

      expect(selectMaterialByName(state, 'Material 2'), 'to be', null)
    })

    it('returns null if materialStructure is undefined', () => {
      materials.materialStructure = undefined
      const state = {
        material: {materials}
      }

      expect(selectMaterialByName(state, 'Material 2'), 'to be', null)
    })
  })

  describe('selectFinishGroup()', () => {
    let materials

    beforeEach(() => {
      materials = {
        materialStructure: [
          {
            materials: []
          },
          {
            materials: [
              {
                id: 'material-1',
                finishGroups: [
                  {
                    id: 'finish-group-1'
                  }
                ]
              },
              {
                id: 'material-2',
                finishGroups: [
                  {
                    id: 'finish-group-2'
                  },
                  {
                    id: 'finish-group-3'
                  }
                ]
              }
            ]
          }
        ]
      }
    })

    it('returns expected finish group', () => {
      const state = {
        material: {materials}
      }

      expect(selectFinishGroup(state, 'material-2', 'finish-group-2'), 'to equal', {
        id: 'finish-group-2'
      })
    })

    it('returns null if material does not exist', () => {
      const state = {
        material: {materials}
      }

      expect(selectFinishGroup(state, 'some-other-material', 'finish-group-2'), 'to be', null)
    })

    it('returns null if finish group does not exist', () => {
      const state = {
        material: {materials}
      }

      expect(selectFinishGroup(state, 'material-2', 'some-other-finish-group'), 'to be', null)
    })
  })

  describe('selectCurrentMaterial()', () => {
    let materials
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()

      materials = {
        materialStructure: [
          {
            materials: []
          },
          {
            materials: [
              {
                id: 'material-1',
                name: 'Material 1'
              },
              {
                id: 'material-2',
                name: 'Material 2'
              }
            ]
          }
        ]
      }
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('returns expected material', () => {
      const state = {
        material: {
          materials,
          selectedMaterial: 'material-2'
        }
      }

      expect(selectCurrentMaterial(state), 'to equal', {
        id: 'material-2',
        name: 'Material 2'
      })
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

    it('returns default material from config if selected material is undefined', () => {
      sandbox.stub(config, 'defaultSelectedMaterial').value('Material 1')
      const state = {
        material: {
          materials,
          selectedMaterial: undefined
        }
      }

      expect(selectCurrentMaterial(state), 'to equal', {
        id: 'material-1',
        name: 'Material 1'
      })
    })
  })

  describe('selectPrintingServiceRequests()', () => {
    let state

    beforeEach(() => {
      state = {
        price: {
          printingServiceComplete: {
            imaterialize: false,
            shapeways: true
          }
        }
      }
    })

    it('returns expected counts', () => {
      expect(selectPrintingServiceRequests(state), 'to equal', {
        complete: 1,
        total: 2
      })
    })

    it('returns null if printingServiceComplete object is missing', () => {
      state.price.printingServiceComplete = null
      expect(selectPrintingServiceRequests(state), 'to equal', null)
    })
  })

  describe('selectOffersForSelectedMaterialConfig', () => {
    let state

    beforeEach(() => {
      state = {
        price: {
          offers: [
            {
              materialConfigId: 'config-1',
              totalPrice: 10
            },
            {
              materialConfigId: 'config-2',
              totalPrice: 10
            },
            {
              materialConfigId: 'config-1',
              totalPrice: 20
            }
          ]
        },
        material: {
          selectedMaterialConfig: 'config-1'
        }
      }
    })

    it('returns expected offers', () => {
      expect(selectOffersForSelectedMaterialConfig(state), 'to equal', [
        {
          materialConfigId: 'config-1',
          totalPrice: 10
        },
        {
          materialConfigId: 'config-1',
          totalPrice: 20
        }
      ])
    })

    it('returns null if offers is null', () => {
      state.price.offers = null
      expect(selectOffersForSelectedMaterialConfig(state), 'to equal', null)
    })
  })

  describe('selectMaterialByMaterialConfigId', () => {
    let state
    let material
    let materialConfig
    let otherMaterialConfig

    beforeEach(() => {
      materialConfig = {
        id: 'some-material-config-id'
      }
      otherMaterialConfig = {
        id: 'some-other-material-config-id'
      }
      material = {
        finishGroups: [
          {
            materialConfigs: [materialConfig, otherMaterialConfig]
          }
        ]
      }
      state = {
        material: {
          materials: {
            materialStructure: [
              {
                materials: [material]
              }
            ]
          }
        }
      }
    })

    it('selects the material by id and returns it together with finish group and material config', () => {
      expect(selectMaterialByMaterialConfigId(state, 'some-other-material-config-id'), 'to equal', {
        material,
        finishGroup: {
          materialConfigs: [materialConfig, otherMaterialConfig]
        },
        materialConfig: otherMaterialConfig
      })
    })

    it('returns empty object if it does not find a materialConfig', () => {
      expect(selectMaterialByMaterialConfigId(state, 'some-3rd-material-config-id'), 'to equal', {})
    })
  })

  describe('selectedOfferMaterial', () => {
    let state
    let material
    let materialConfig

    beforeEach(() => {
      materialConfig = {
        id: 'some-material-config-id'
      }
      material = {
        finishGroups: [
          {
            materialConfigs: [materialConfig]
          }
        ]
      }
      state = {
        price: {
          selectedOffer: {
            materialConfigId: 'some-material-config-id'
          }
        },
        material: {
          materials: {
            materialStructure: [
              {
                materials: [material]
              }
            ]
          }
        }
      }
    })

    it('selects the material defined in the selectedOffer', () => {
      expect(selectedOfferMaterial(state), 'to equal', {
        material,
        finishGroup: {
          materialConfigs: [materialConfig]
        },
        materialConfig
      })
    })
  })

  describe('selectModelByModelId', () => {
    let state

    beforeEach(() => {
      state = {
        model: {
          models: [{modelId: 'some-model-1'}, {modelId: 'some-model-2'}]
        }
      }
    })

    it('returns expected model', () => {
      expect(selectModelByModelId(state, 'some-model-2'), 'to equal', {modelId: 'some-model-2'})
    })

    it('returns null if the model does not exist', () => {
      expect(selectModelByModelId(state, 'some-other-model-id'), 'to be', null)
    })
  })

  describe('selectOfferItems', () => {
    let state

    beforeEach(() => {
      state = {
        price: {
          selectedOffer: {
            items: [
              {
                modelId: 'some-model-id'
              },
              {
                modelId: 'some-other-model-id'
              }
            ]
          }
        },
        model: {
          models: [
            {
              modelId: 'some-model-id',
              thumbnailUrl: 'some-thumbnail-url',
              fileName: 'some-model-name'
            },
            {
              modelId: 'some-other-model-id',
              thumbnailUrl: 'some-other-thumbnail-url',
              fileName: 'some-other-model-name'
            }
          ]
        }
      }
    })

    it('returns selectedOffer items with thumbnailUrl', () => {
      expect(selectOfferItems(state), 'to equal', [
        {
          modelId: 'some-model-id',
          thumbnailUrl: 'some-thumbnail-url',
          fileName: 'some-model-name'
        },
        {
          modelId: 'some-other-model-id',
          thumbnailUrl: 'some-other-thumbnail-url',
          fileName: 'some-other-model-name'
        }
      ])
    })
  })

  describe('selectAreAllUploadsFinished()', () => {
    it('returns true if all uploads are finished', () => {
      expect(
        selectAreAllUploadsFinished({
          model: {
            numberOfUploads: 0,
            models: [{modelId: 'some-model-1'}, {modelId: 'some-model-2'}]
          }
        }),
        'to be',
        true
      )
    })

    it('returns false if not all uploads are finished', () => {
      expect(
        selectAreAllUploadsFinished({
          model: {
            numberOfUploads: 1,
            models: [{modelId: 'some-model-1'}, {modelId: 'some-model-2'}]
          }
        }),
        'to be',
        false
      )
    })

    it('returns false if no models are uploaded', () => {
      expect(
        selectAreAllUploadsFinished({
          model: {
            numberOfUploads: 0,
            models: []
          }
        }),
        'to be',
        false
      )
    })
  })

  describe('selectFeatures()', () => {
    it('returns the feature toggles in an object without prototype', () => {
      const query = new URLSearchParams()
      const features = {
        a: true,
        b: true,
        c: true,
        d: true
      }

      query.append('feature:a', true)
      query.append('feature:b', '')
      query.append('feature:c', null)
      query.append('feature:d', false)

      expect(
        selectFeatures({
          routing: {
            location: {
              search: query.toString()
            }
          }
        }),
        'to equal',
        features
      )
    })

    it('does not detect query parameters without "feature:" prefix as feature', () => {
      const query = new URLSearchParams()
      const features = {}

      query.append('a', true)
      query.append('b', '')
      query.append('c', null)
      query.append('d', false)

      expect(
        selectFeatures({
          routing: {
            location: {
              search: query.toString()
            }
          }
        }),
        'to equal',
        features
      )
    })
  })

  describe('selectLocationQuery()', () => {
    describe('when there is no location query', () => {
      it('returns an instance of URLSearchParams', () => {
        const params = selectLocationQuery({})

        expect(params instanceof URLSearchParams, 'to equal', true)
      })

      it('returns an empty URLSearchParams', () => {
        const params = selectLocationQuery({})

        expect([...params.entries()], 'to equal', [])
      })
    })

    describe('when there is a location query', () => {
      it('returns an instance of URLSearchParams', () => {
        const params = selectLocationQuery({})

        expect(params instanceof URLSearchParams, 'to equal', true)
      })

      it('returns a params object that provides access to the query params', () => {
        const params = selectLocationQuery({
          routing: {
            location: {
              search: 'a&b=false&c=2'
            }
          }
        })
        const pairs = [...params.entries()]

        expect(pairs, 'to equal', [['a', ''], ['b', 'false'], ['c', '2']])
      })
    })
  })
})
