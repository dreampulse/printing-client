import {
  createConfiguration,
  restoreConfiguration
} from 'Action/configuration'
import * as printingEngine from 'Lib/printing-engine'
import * as location from 'Service/location'
import * as priceActions from 'Action/price'

describe('Configuration actions', () => {
  let initialStoreData
  let store
  let sandbox

  beforeEach(() => {
    initialStoreData = {
      model: {
        models: [{
          modelId: 'some-model-id',
          quantity: 42
        }],
        numberOfUploads: 0
      },
      material: {
        selectedMaterialConfig: 'some-material-config-id'
      },
      user: {
        userId: 'some-user-id'
      }
    }
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('createConfiguration()', () => {
    beforeEach(() => {
      sandbox.stub(printingEngine, 'createConfiguration')
      sandbox.stub(location, 'getBaseUrl')

      location.getBaseUrl.returns('http://example.com')
    })

    it('dispatches expected actions when called without material config', async () => {
      printingEngine.createConfiguration
        .withArgs({
          items: [{
            modelId: 'some-model-id',
            quantity: 42
          }]
        })
        .returns({configurationId: 'some-configuration-id'})

      await store.dispatch(createConfiguration())
      expect(store.getActions(), 'to equal', [{
        // TODO: this action creator should have been mocked in the first place
        // (its not an integration test)

        // TODO: The first action is only temporary
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {method: 'push', args: ['/configuration/some-configuration-id']}
      }, {
        type: 'DIRECT_SALES.CREATE_CONFIGURATION',
        payload: 'http://example.com/configuration/some-configuration-id'
      }])
    })

    it('dispatches expected actions when called with material config', async () => {
      printingEngine.createConfiguration
        .withArgs({
          items: [{
            modelId: 'some-model-id',
            quantity: 42
          }],
          materialConfigId: 'some-material-config-id'
        })
        .returns({configurationId: 'some-configuration-id'})

      await store.dispatch(createConfiguration(true))
      expect(store.getActions(), 'to equal', [{
        // TODO: this action creator should have been mocked in the first place
        // (its not an integration test)

        // TODO: The first action is only temporary
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {method: 'push', args: ['/configuration/some-configuration-id']}
      }, {
        type: 'DIRECT_SALES.CREATE_CONFIGURATION',
        payload: 'http://example.com/configuration/some-configuration-id'
      }])
    })

    it('dispatches nothing when upload is still in progress', async () => {
      store = mockStore({
        model: {
          numberOfUploads: 42
        },
        material: {
          selectedMaterialConfig: null
        }
      })
      await store.dispatch(createConfiguration())
      expect(store.getActions(), 'to equal', [])
    })
  })

  describe('restoreConfiguration()', () => {
    let features

    beforeEach(() => {
      features = {refresh: true}

      sandbox.stub(priceActions, 'createPriceRequest')
      sandbox.stub(printingEngine, 'getConfiguration')

      priceActions.createPriceRequest.returns({
        type: 'some-create-price-request-action'
      })
    })

    it('dispatches expected actions', async () => {
      printingEngine.getConfiguration
        .withArgs('some-configuration-id')
        .returns('some-configuration')

      await store.dispatch(restoreConfiguration('some-configuration-id', features))
      expect(store.getActions(), 'to equal', [{
        type: 'DIRECT_SALES.RESTORE_CONFIGURATION',
        payload: 'some-configuration'
      }, {
        type: 'some-create-price-request-action'
      }])
      expect(priceActions.createPriceRequest, 'to have a call satisfying', [
        {refresh: true}
      ])
    })

    it('does not create price request when user is missing', async () => {
      store = mockStore({
        model: initialStoreData.model,
        user: {
          // empty user object
        }
      })

      printingEngine.getConfiguration
        .withArgs('some-configuration-id')
        .returns('some-configuration')

      await store.dispatch(restoreConfiguration('some-configuration-id', features))
      expect(store.getActions(), 'to equal', [{
        type: 'DIRECT_SALES.RESTORE_CONFIGURATION',
        payload: 'some-configuration'
      }])
    })
  })
})
