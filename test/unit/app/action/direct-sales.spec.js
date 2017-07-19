import {
  createConfiguration,
  restoreConfiguration
} from 'Action/direct-sales'
import * as printingEngine from 'Lib/printing-engine'
import * as location from 'Service/location'
import * as priceActions from 'Action/price'

describe('Direct Sales actions', () => {
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
      user: {
        userId: 'some-user-id'
      }
    }
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine, 'createConfiguration')
    sandbox.stub(printingEngine, 'getConfiguration')
    sandbox.stub(priceActions, 'createPriceRequest')
    sandbox.stub(location, 'getBaseUrl')

    location.getBaseUrl.returns('some-base-url://')

    priceActions.createPriceRequest.returns({
      type: 'some-create-price-request-action'
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('restoreConfiguration()', () => {
    it('dispatches expected actions, when everything succeeds', async () => {
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
        // TODO: The first action is only temporary
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {method: 'push', args: ['/configuration/some-configuration-id']}
      }, {
        type: 'DIRECT_SALES.CREATE_CONFIGURATION',
        payload: 'some-base-url:///configuration/some-configuration-id'
      }])
    })

    it('dispatches noting, when upload is still in progress', async () => {
      store = mockStore({
        model: {
          numberOfUploads: 42
        }
      })
      await store.dispatch(createConfiguration())
      expect(store.getActions(), 'to equal', [])
    })
  })

  describe('restoreConfiguration()', () => {
    it('dispatches expected actions', async () => {
      printingEngine.getConfiguration
        .withArgs('some-configuration-id')
        .returns('some-configuration')

      await store.dispatch(restoreConfiguration('some-configuration-id'))
      expect(store.getActions(), 'to equal', [{
        type: 'DIRECT_SALES.RESTORE_CONFIGURATION',
        payload: 'some-configuration'
      }, {
        type: 'some-create-price-request-action'
      }])
    })

    it('does not create price request, when user is missing', async () => {
      store = mockStore({
        model: initialStoreData.model,
        user: {
          // empty user object
        }
      })

      printingEngine.getConfiguration
        .withArgs('some-configuration-id')
        .returns('some-configuration')

      await store.dispatch(restoreConfiguration('some-configuration-id'))
      expect(store.getActions(), 'to equal', [{
        type: 'DIRECT_SALES.RESTORE_CONFIGURATION',
        payload: 'some-configuration'
      }])
    })
  })
})
