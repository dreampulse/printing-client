import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {createAction} from 'redux-actions'
import uniqueId from 'lodash/uniqueId'

import * as modelActions from '../action/model'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

import TYPE from '../type'

// Action creators
export const uploadToBackendStarted = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)
export const uploadToBackendProgressed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)
export const uploadToBackendFinished = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)
export const uploadToBackendFailed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED)
export const checkStatusStarted = createAction(TYPE.MODEL.CHECK_STATUS_STARTED)
export const checkStatusFinished = createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)

// https://www.learnrxjs.io
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md
// https://xgrommx.github.io/rx-book/why_rx.html

// Epics

export const checkUploadStatusEpic = action$ =>
  action$.ofType(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)
    .map(action => action.payload)
    .flatMap(({modelId, fileId}) => [
      Observable.of(
        checkStatusStarted({fileId})
      ),
      Observable.fromPromise(
        pollApi(() => printingEngine.getUploadStatus({modelId}))
      ).map(() =>
        checkStatusFinished({fileId})
      ).catch(() =>
        Observable.of(checkStatusFinished({fileId, error: true}))
      )
    ])
    .mergeAll()

export const uploadFiles = createAction(TYPE.MODEL.UPLOAD_FILES)
export const uploadFilesEpic = action$ =>
  action$.ofType(TYPE.MODEL.UPLOAD_FILES)
    .flatMap(action =>
      action.payload.map(modelActions.uploadFile)
    )

export const uploadFile = createAction(TYPE.MODEL.UPLOAD_FILE)
export const uploadFileEpic = (action$, {getState}) =>
  action$.ofType(TYPE.MODEL.UPLOAD_FILE)
    .map(action => action.payload)
    .flatMap((file) => {
      const fileId = uniqueId('file-id-')
      const unit = getState().model.selectedUnit

      const uploadStart$ = Observable.of(
        uploadToBackendStarted({
          fileId,
          name: file.name,
          size: file.size
        })
      )
      const uploadProgress$ = new BehaviorSubject()
      const uploadResult$ = Observable.fromPromise(
        printingEngine.uploadModel(file, {unit}, uploadProgress$)
      )

      return [
        uploadStart$,
        uploadResult$
          .map(({modelId}) =>
            uploadToBackendFinished({modelId, fileId})
          )
          .catch(() =>
            Observable.of(uploadToBackendFailed({fileId, error: true}))
          ),
        uploadProgress$
          .map(progress =>
            uploadToBackendProgressed({progress, fileId})
          )
      ]
    })
    .mergeAll()
