import * as printingEngine from '../../../../src/app/lib/printing-engine'
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
    sandbox.stub(printingEngine, 'getModelWithStatus').resolves(modelWithStatusMock)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('pollingFunction.getModelSceneId()', () => {
    it('calls modelLib.getModelWithStatus() with the given model id', () => {
      pollingFunction.getModelSceneId('some-model-id')
      expect(printingEngine.getModelWithStatus, 'to have a call satisfying', ['some-model-id'])
    })

    describe('when the returned model has a sceneId that is a string', () => {
      beforeEach(() => {
        modelWithStatusMock.model.sceneId = 'some-scene-id'
      })

      it('resolves with the sceneId', async () => {
        expect(await pollingFunction.getModelSceneId('some-model-id'), 'to equal', 'some-scene-id')
      })
    })

    // As returned by the backend
    describe('when the returned model has a sceneId that is a null', () => {
      beforeEach(() => {
        modelWithStatusMock.model.sceneId = null
      })

      it('resolves with the POLLING_FAILED symbol', async () => {
        expect(await pollingFunction.getModelSceneId('some-model-id'), 'to equal', POLLING_FAILED)
      })
    })

    describe('when the returned model has no sceneId at all', () => {
      it('resolves with the POLLING_FAILED symbol', async () => {
        expect(await pollingFunction.getModelSceneId('some-model-id'), 'to equal', POLLING_FAILED)
      })
    })
  })
})
