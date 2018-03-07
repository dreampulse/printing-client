import * as modelLib from '../../../../src/app/lib/model'
import {pollingFunction, POLLING_FAILED} from '../../../../src/app/lib/polling'

describe('polling lib', () => {
  let modelWithStatusMock
  let sandbox

  beforeEach(() => {
    modelWithStatusMock = {
      isComplete: true,
      model: {}
    }
    sandbox = sinon.sandbox.create()
    sandbox.stub(modelLib, 'getModelWithStatus').resolves(modelWithStatusMock)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('pollingFunction.modelSceneId()', () => {
    it('calls modelLib.getModelWithStatus() with the given model id', () => {
      pollingFunction.modelSceneId('some-model-id')
      expect(modelLib.getModelWithStatus, 'to have a call satisfying', ['some-model-id'])
    })

    describe('when the returned model has a sceneId that is a string', () => {
      beforeEach(() => {
        modelWithStatusMock.model.sceneId = 'some-scene-id'
      })

      it('resolves with the sceneId', async () => {
        expect(await pollingFunction.modelSceneId('some-model-id'), 'to equal', 'some-scene-id')
      })
    })

    // As returned by the backend
    describe('when the returned model has a sceneId that is a null', () => {
      beforeEach(() => {
        modelWithStatusMock.model.sceneId = null
      })

      it('resolves with the POLLING_FAILED symbol', async () => {
        expect(await pollingFunction.modelSceneId('some-model-id'), 'to equal', POLLING_FAILED)
      })
    })

    describe('when the returned model has no sceneId at all', () => {
      it('resolves with the POLLING_FAILED symbol', async () => {
        expect(await pollingFunction.modelSceneId('some-model-id'), 'to equal', POLLING_FAILED)
      })
    })
  })
})
