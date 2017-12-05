import cloneDeep from 'lodash/cloneDeep'
import * as core from 'App/action-next/core'
import {generateMaterialIds} from 'App/lib/material'
import {selectMaterialGroups, selectUploadingModels} from 'App/selector'
import {uploadModel} from 'App/lib/printing-engine'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'

describe('core action', () => {
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
    describe('using selectUploadingModels() selector', () => {
      it('returns the uploaded models', () => {
        // Has the shape of the browsers native file object
        // See: https://github.com/facebook/flow/blob/v0.59.0/lib/dom.js#L44
        const file = {
          name: 'some-file-name',
          size: 42
        }

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

      it('creates unique fileIds', () => {
        const file = {
          name: 'some-file-name',
          size: 42
        }

        // TODO: Improve Interface
        const {state} = reduceState(testDispatch(core.uploadFile(file)).state)(
          core.uploadFile(file)
        )

        const uploadingModels = selectUploadingModels(state)
        expect(uploadingModels[0].fileId, 'not to equal', uploadingModels[1].fileId)
      })

      it('triggers uploadModel command', () => {
        const file = {
          name: 'some-file-name',
          size: 42
        }

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

        const {actions} = testDispatch(core.uploadFile(file)).simulate({
          func: uploadModel,
          args: [file, {unit: 'mm'}, expect.it('to be a', 'function')],
          result: uploadResult
        })
        expect(actions, 'to satisfy', [
          core.uploadComplete(expect.it('to be a', 'string'), uploadResult)
        ])
      })
    })
  })
})
