import URLSearchParams from 'url-search-params'
import {
  selectCommonQuantity,
  selectMaterialGroup,
  selectMaterial,
  selectMaterialByName,
  selectFinishGroup,
  selectCurrentMaterialGroup,
  selectCurrentMaterial,
  selectOffersForSelectedMaterialConfig,
  selectPrintingServiceRequests,
  selectMaterialByMaterialConfigId,
  selectedOfferMaterial,
  selectModelByModelId,
  selectOfferItems,
  selectAreAllUploadsFinished,
  selectFeatures,
  selectSearchParams
} from '../../../../src/app/lib/selector'

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

    it('returns undefined if a model has no quantity', () => {
      const state = {
        model: {
          models: [{}, {quantity: 1}]
        }
      }

      expect(selectCommonQuantity(state), 'to be', undefined)
    })
  })

  describe('selectMaterialGroup()', () => {
    let materialGroups

    beforeEach(() => {
      materialGroups = [
        {
          id: 'group-1'
        },
        {
          id: 'group-2'
        }
      ]
    })

    it('returns expected material group', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectMaterialGroup(state, 'group-2'), 'to equal', {id: 'group-2'})
    })

    it('returns null if there are no materialGroups in state', () => {
      const state = {
        material: {
          materialGroups: undefined
        }
      }

      expect(selectMaterialGroup(state, 'group-2'), 'to be', null)
    })
  })

  describe('selectMaterial()', () => {
    let materialGroups

    beforeEach(() => {
      materialGroups = [
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
    })

    it('returns expected material', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectMaterial(state, 'material-2'), 'to equal', {id: 'material-2'})
    })

    it('returns null if there are no materialGroups in state', () => {
      const state = {
        material: {
          materialGroups: undefined
        }
      }

      expect(selectMaterial(state, 'material-2'), 'to be', null)
    })

    it('returns null if the given material id is undefined', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectMaterial(state), 'to be', null)
    })
  })

  describe('selectMaterialByName()', () => {
    let materialGroups

    beforeEach(() => {
      materialGroups = [
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
    })

    it('returns expected material', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectMaterialByName(state, 'Material 2'), 'to equal', {
        id: 'material-2',
        name: 'Material 2'
      })
    })

    it('returns null if there are no materialGroups in state', () => {
      const state = {
        material: {
          materialGroups: undefined
        }
      }

      expect(selectMaterialByName(state, 'Material 2'), 'to be', null)
    })
  })

  describe('selectFinishGroup()', () => {
    let materialGroups

    beforeEach(() => {
      materialGroups = [
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
    })

    it('returns expected finish group', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectFinishGroup(state, 'material-2', 'finish-group-2'), 'to equal', {
        id: 'finish-group-2'
      })
    })

    it('returns null if materialGroups does not exist', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectFinishGroup(state, 'some-other-material', 'finish-group-2'), 'to be', null)
    })

    it('returns null if finish group does not exist', () => {
      const state = {
        material: {materialGroups}
      }

      expect(selectFinishGroup(state, 'material-2', 'some-other-finish-group'), 'to be', null)
    })
  })

  describe('selectCurrentMaterialGroup()', () => {
    let materialGroups
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()

      materialGroups = [
        {
          id: 'group-1'
        },
        {
          id: 'group-2'
        }
      ]
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('returns expected material group', () => {
      const state = {
        material: {
          materialGroups,
          selectedMaterialGroup: 'group-2'
        }
      }

      expect(selectCurrentMaterialGroup(state), 'to equal', {
        id: 'group-2'
      })
    })

    it('returns null if there are no materialGroups in state', () => {
      const state = {
        material: {
          materialGroups: undefined,
          selectedMaterialGroup: 'group-2'
        }
      }

      expect(selectCurrentMaterialGroup(state), 'to be', null)
    })

    it('returns first material if selected material is undefined', () => {
      const state = {
        material: {
          materialGroups,
          selectedMaterialGroup: undefined
        }
      }

      expect(selectCurrentMaterialGroup(state), 'to equal', {id: 'group-1'})
    })
  })

  describe('selectCurrentMaterial()', () => {
    let materialGroups
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()

      materialGroups = [
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
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('returns expected material', () => {
      const state = {
        material: {
          materialGroups,
          selectedMaterial: 'material-2'
        }
      }

      expect(selectCurrentMaterial(state), 'to equal', {
        id: 'material-2',
        name: 'Material 2'
      })
    })

    it('returns null if there are no materialGroups in state', () => {
      const state = {
        material: {
          materialGroups: undefined,
          selectedMaterial: 'material-2'
        }
      }

      expect(selectCurrentMaterial(state), 'to be', null)
    })

    it('returns null if selected material is undefined', () => {
      const state = {
        material: {
          materialGroups,
          selectedMaterial: undefined
        }
      }

      expect(selectCurrentMaterial(state), 'to be', null)
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
          materialGroups: [
            {
              materials: [material]
            }
          ]
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

    it('returns null if materialGroups are not defined', () => {
      state.material.materialGroups = undefined
      expect(selectMaterialByMaterialConfigId(state, 'some-material-config-id'), 'to be', null)
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
          materialGroups: [
            {
              materials: [material]
            }
          ]
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

    it('returns null if there is no selected offer', () => {
      state.price.selectedOffer = undefined
      expect(selectedOfferMaterial(state), 'to be', null)
    })
  })

  describe('selectModelByModelId', () => {
    let state

    beforeEach(() => {
      state = {
        model: {
          models: [{}, {modelId: 'some-model-1'}, {modelId: 'some-model-2'}]
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
              },
              {
                modelId: 'some-unknown-id'
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
            },
            {
              modelId: 'some-other-model-id',
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
        },
        {modelId: 'some-unknown-id', thumbnailUrl: null, fileName: null}
      ])
    })

    it('returns null if there is no selected offer', () => {
      state.price.selectedOffer = undefined
      expect(selectOfferItems(state), 'to be', null)
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

  describe('selectSearchParams()', () => {
    describe('when there is no location query', () => {
      it('returns an instance of URLSearchParams', () => {
        const params = selectSearchParams({})

        expect(params instanceof URLSearchParams, 'to equal', true)
      })

      it('returns an empty URLSearchParams', () => {
        const params = selectSearchParams({})

        expect([...params.entries()], 'to equal', [])
      })
    })

    describe('when there is a location query', () => {
      it('returns an instance of URLSearchParams', () => {
        const params = selectSearchParams({})

        expect(params instanceof URLSearchParams, 'to equal', true)
      })

      it('returns a params object that provides access to the query params', () => {
        const params = selectSearchParams({
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
