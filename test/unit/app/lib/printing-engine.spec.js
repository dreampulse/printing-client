import config from '../../../../config'
import * as httpJson from '../../../../src/app/lib/http-json'
import {getMaterialGroups, uploadModel, getModel} from '../../../../src/app/lib/printing-engine'
import getFileMock from '../../../mock/file'

const baseUrl = config.printingEngineBaseUrl

describe('printing-engine lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getMaterialGroups()', () => {
    let materialGroupsMock

    beforeEach(() => {
      materialGroupsMock = {}
      sandbox.stub(httpJson, 'fetch').resolves({
        json: materialGroupsMock
      })
    })

    it('calls httpJson.fetch() with the correct URL', async () => {
      await getMaterialGroups()
      expect(httpJson.fetch, 'to have a call satisfying', [`${baseUrl}/v3/material`])
    })

    it('returns the material groups which is the json property from httpJson.fetch()', async () => {
      const result = await getMaterialGroups('some-model-id')

      expect(result, 'to be', materialGroupsMock)
    })
  })

  describe('uploadModel()', () => {
    let fileMock
    let responseMock
    let modelMock
    let dispatchMock
    let onProgressActionCreatorMock

    beforeEach(() => {
      fileMock = getFileMock()
      responseMock = {}
      modelMock = {}
      dispatchMock = sinon.spy()
      onProgressActionCreatorMock = progress => ({progress})
      sandbox.stub(httpJson, 'upload').resolves({
        json: modelMock,
        http: responseMock
      })
    })

    it('calls httpJson.upload() with the correct upload options', async () => {
      await uploadModel(fileMock, {unit: 'mm'}, dispatchMock, onProgressActionCreatorMock)
      expect(httpJson.upload, 'to have a call satisfying', [
        {method: 'POST', url: `${baseUrl}/v3/model`, body: {file: fileMock, unit: 'mm'}}
      ])
    })

    it('returns the backend model which is the json property from httpJson.upload()', async () => {
      const model = await uploadModel(
        fileMock,
        {unit: 'mm'},
        dispatchMock,
        onProgressActionCreatorMock
      )
      expect(model, 'to be', modelMock)
    })

    it('dispatches an action using the onProgressActionCreator each time the onProgress handler is called', async () => {
      await uploadModel(fileMock, {unit: 'mm'}, dispatchMock, onProgressActionCreatorMock)

      const onProgressHandler = httpJson.upload.firstCall.args[0].onProgress

      onProgressHandler(1)
      onProgressHandler(2)
      onProgressHandler(3)

      expect(dispatchMock.firstCall.args, 'to satisfy', [{progress: 1}])
      expect(dispatchMock.secondCall.args, 'to satisfy', [{progress: 2}])
      expect(dispatchMock.thirdCall.args, 'to satisfy', [{progress: 3}])
    })
  })

  describe('getModel()', () => {
    let responseMock
    let modelMock

    beforeEach(() => {
      responseMock = {}
      modelMock = {}
      sandbox.stub(httpJson, 'fetch').resolves({
        json: modelMock,
        http: responseMock
      })
    })

    it('calls httpJson.fetch() with the correct URL', async () => {
      await getModel('some-model-id')
      expect(httpJson.fetch, 'to have a call satisfying', [`${baseUrl}/v3/model/some-model-id`])
    })

    it('returns an object that provides a model property and an isComplete property', async () => {
      const result = await getModel('some-model-id')
      expect(result, 'to equal', modelMock)
    })
  })
})
