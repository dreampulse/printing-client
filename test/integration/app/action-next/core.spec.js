import {Cmd} from 'redux-loop'
import cloneDeep from 'lodash/cloneDeep'
import * as core from 'App/action-next/core'
import {generateMaterialIds} from 'App/lib/material'
import {selectMaterialGroups, selectUploadingModels} from 'App/selector'
import {uploadModel} from 'App/lib/printing-engine'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'
import {testDispatch} from '../../../helper'

// Has the shape of the browsers native file object
// See: https://github.com/facebook/flow/blob/v0.59.0/lib/dom.js#L44
const file = {
  name: 'some-file-name',
  size: 42
}

describe('core action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('updateMaterialGroups()', () => {
    ;[
      [selectMaterialGroups, generateMaterialIds(cloneDeep(materialListResponse.materialStructure))]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const materialGroups = materialListResponse.materialStructure
        const {state} = testDispatch(core.updateMaterialGroups(materialGroups))
        expect(selector(state), 'to equal', expected)
      })
    })

    it('selectMaterialGroups(state) returns a copy of the action payload', () => {
      const materialGroups = [materialListResponse.materialStructure[0]]
      const {state} = testDispatch(core.updateMaterialGroups(materialGroups))
      expect(selectMaterialGroups(state), 'not to be', materialGroups)
    })
  })

  describe('uploadFile()', () => {
    it('creates unique fileIds', () => {
      const uploadFileAction1 = core.uploadFile(file)
      const uploadFileAction2 = core.uploadFile(file)

      expect(uploadFileAction1.payload.fileId, 'not to equal', uploadFileAction2.payload.fileId)
    })

    describe('using selectUploadingModels() selector', () => {
      it('returns the uploaded models', () => {
        const {state} = testDispatch(core.uploadFile(file))

        expect(selectUploadingModels(state), 'to satisfy', [
          {
            fileId: expect.it('to be a', 'string'),
            fileName: 'some-file-name',
            fileSize: 42,
            progress: 0,
            error: false
          }
        ])
      })

      it('triggers the core.uploadProgress() action as soon as uploadModel() has a progress', () => {
        const uploadFileAction = core.uploadFile(file)
        const {cmds} = testDispatch(uploadFileAction)
        const uploadModelCmd = cmds.find(cmd => cmd.func === uploadModel)
        const onProgress = uploadModelCmd.args[2]

        sandbox.spy(Cmd, 'dispatch')
        onProgress(30)

        expect(Cmd.dispatch, 'to have a call satisfying', [
          core.uploadProgress(uploadFileAction.payload.fileId, 30)
        ])
      })

      it('triggers the core.uploadComplete() action with the file id and the result from uploadModel()', () => {
        const uploadResult = {
          modelId: 'some-model-id',
          fileName: 'some-filename',
          fileUnit: 'mm',
          area: 42,
          volume: 42,
          dimensions: {
            x: 42,
            y: 42,
            z: 42
          },
          thumbnailUrl: 'some-thumbnail-url'
        }
        const uploadFileAction = core.uploadFile(file)
        const {actions} = testDispatch(uploadFileAction).simulate({
          func: uploadModel,
          args: [file, {unit: 'mm'}, expect.it('to be a', 'function')],
          result: uploadResult
        })

        expect(
          actions,
          'to have an item satisfying',
          core.uploadComplete(expect.it('to be', uploadFileAction.payload.fileId), uploadResult)
        )
      })

      it('triggers the core.uploadFail() action with the file id and the error from uploadModel()', () => {
        const uploadFileAction = core.uploadFile(file)
        const error = new Error('File upload failed')
        const {actions} = testDispatch(uploadFileAction).simulate({
          func: uploadModel,
          result: error
        })

        expect(
          actions,
          'to have an item satisfying',
          core.uploadFail(expect.it('to be', uploadFileAction.payload.fileId), error)
        )
      })
    })
  })

  describe('uploadProgress()', () => {
    describe('using selectUploadingModels() selector', () => {
      it('updates the model with the given file id', () => {
        const uploadFileAction = core.uploadFile(file)
        const fileId = uploadFileAction.payload.fileId
        const {state} = testDispatch([uploadFileAction, core.uploadProgress(fileId, 30)])
        const model = selectUploadingModels(state).find(m => m.fileId === fileId)

        expect(model, 'to satisfy', {progress: 30})
      })

      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = core.uploadFile(file)
        const uploadFileAction2 = core.uploadFile(file)
        const uploadFileAction3 = core.uploadFile(file)
        const fileId2 = uploadFileAction2.payload.fileId
        const multiFileUploadScenario = testDispatch([
          uploadFileAction1,
          uploadFileAction2,
          uploadFileAction3
        ])
        const orderBeforeDispatch = selectUploadingModels(multiFileUploadScenario.state).map(
          m => m.fileId
        )
        const {state} = multiFileUploadScenario.dispatch(core.uploadProgress(fileId2, 30))
        const orderAfterDispatch = selectUploadingModels(state).map(m => m.fileId)

        expect(orderBeforeDispatch, 'to equal', orderAfterDispatch)
      })
    })
  })
})
