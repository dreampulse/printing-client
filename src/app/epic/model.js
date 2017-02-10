import {Observable} from 'rxjs/Observable'

import {combineEpics} from 'redux-observable'
import uniqueId from 'lodash/uniqueId'

import * as modelActions from '../action/model'
import * as actionCreator from '../action-creator'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

import TYPE from '../type'

// https://www.learnrxjs.io/operators/creation/frompromise.html
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md
// https://xgrommx.github.io/rx-book/why_rx.html

export const checkUploadStatus = action$ =>
  action$.ofType(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)
    .map(action => action.payload)
    .flatMap(({modelId, fileId}) => [
      Observable.of(
        actionCreator.modelCheckStatusStarted({fileId})
      ),
      Observable.fromPromise(
        pollApi(() => printingEngine.getUploadStatus({modelId}))
      ).map(() =>
        actionCreator.modelCheckStatusFinished({fileId})
      ).catch(() =>
        Observable.of(actionCreator.modelCheckStatusFinished({fileId, error: true}))
      )
    ])
    .mergeAll()

export const uploadFiles = action$ =>
  action$.ofType(TYPE.MODEL.UPLOAD_FILES)
    .flatMap(action =>
      action.payload.map(modelActions.uploadFile)
    )

export const uploadFile = (action$, {getState}) =>
  action$.ofType(TYPE.MODEL.UPLOAD_FILE)
    .map(action => action.payload)
    .flatMap((file) => {
      const fileId = uniqueId('file-id-')
      const unit = getState().model.selectedUnit

      const {result$, progress$} = printingEngine.uploadModel(file, {unit})

      return [
        Observable.of(
          actionCreator.modelUploadToBackendStarted({
            fileId,
            name: file.name,
            size: file.size
          })
        ),
        result$.map(({modelId}) =>
          actionCreator.modelUploadToBackendFinished({modelId, fileId})
        ).catch(() =>
          Observable.of(actionCreator.modelUploadToBackendFailed({fileId, error: true}))
        ),
        progress$.map(progress =>
          actionCreator.modelUploadToBackendProgressed({progress, fileId})
        )
      ]
    })
    .mergeAll()

export default combineEpics(
  uploadFiles,
  uploadFile,
  checkUploadStatus
)
