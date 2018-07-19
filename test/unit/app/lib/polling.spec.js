import * as printingEngine from '../../../../src/app/lib/printing-engine'
import {pollingFunction, POLLING_FAILED} from '../../../../src/app/lib/polling'

describe('polling lib', () => {
  let modelMock
  let sandbox

  beforeEach(() => {
    modelMock = {}
    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine, 'getModel').resolves(modelMock)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('pollingFunction.getModelSceneId()', () => {
    it('calls modelLib.getModel() with the given model id', () => {
      pollingFunction.getModelSceneId('some-model-id')
      expect(printingEngine.getModel, 'to have a call satisfying', ['some-model-id'])
    })

    describe('when the returned model has a sceneId that is a string', () => {
      beforeEach(() => {
        modelMock.sceneId = 'some-scene-id'
      })

      it('resolves with the sceneId', async () => {
        expect(await pollingFunction.getModelSceneId('some-model-id'), 'to equal', 'some-scene-id')
      })
    })

    // As returned by the backend
    describe('when the returned model has a sceneId that is a null', () => {
      beforeEach(() => {
        modelMock.sceneId = null
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
