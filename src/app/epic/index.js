import {combineEpics} from 'redux-observable'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

import model from './model'

export default () => {
  const epic$ = new BehaviorSubject(
    combineEpics(
      model
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
