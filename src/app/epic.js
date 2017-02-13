import {combineEpics} from 'redux-observable'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

import {
  uploadFileEpic,
  uploadFilesEpic,
  checkUploadStatusEpic
} from './action/model'

export default () => {
  const epic$ = new BehaviorSubject(
    combineEpics(
      uploadFileEpic,
      uploadFilesEpic,
      checkUploadStatusEpic
    )
  )

  const rootEpic = (action$, store) =>
    epic$.mergeMap(epic =>
      epic(action$, store)
    )

  return {
    epic$,
    rootEpic
  }
}
