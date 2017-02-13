import {combineEpics} from 'redux-observable'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

import {
  uploadFileEpic,
  uploadFilesEpic,
  checkUploadStatusEpic
} from './action/model'

import {
  createPriceRequestEpic
} from './action/price'

const allEpics = [
  uploadFileEpic,
  uploadFilesEpic,
  checkUploadStatusEpic,
  createPriceRequestEpic
]

export default (epics = allEpics) => {
  const epic$ = new BehaviorSubject(
    combineEpics(...epics)
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
