import config from '../../../../config'
import * as http from '../../../../src/app/lib/http'
import {getModelWithStatus} from '../../../../src/app/lib/model'

const baseUrl = config.printingEngineBaseUrl

describe('model lib', () => {
  let responseMock
  let modelMock
  let sandbox

  beforeEach(() => {
    responseMock = {}
    modelMock = {}
    sandbox = sinon.sandbox.create()
    sandbox.stub(http, 'fetchJson').resolves({
      json: modelMock,
      response: responseMock
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getModelWithStatus()', () => {
    it('calls http.fetchJson() with the correct URL', async () => {
      await getModelWithStatus('some-model-id')
      expect(http.fetchJson, 'to have a call satisfying', [`${baseUrl}/model/some-model-id`])
    })

    it('returns an object that provides a model property and an isComplete property', async () => {
      const result = await getModelWithStatus('some-model-id')

      expect(result, 'to satisfy', {
        model: expect.it('to equal', modelMock),
        isComplete: expect.it('to be a boolean')
      })
    })

    describe('when the response.status was 200', () => {
      beforeEach(() => {
        responseMock.status = 200
      })

      it('returns isComplete true', async () => {
        const result = await getModelWithStatus('some-model-id')

        expect(result, 'to satisfy', {
          isComplete: true
        })
      })
    })

    describe('when the response.status was 206', () => {
      beforeEach(() => {
        responseMock.status = 206
      })

      it('returns isComplete false', async () => {
        const result = await getModelWithStatus('some-model-id')

        expect(result, 'to satisfy', {
          isComplete: false
        })
      })
    })
  })
})
