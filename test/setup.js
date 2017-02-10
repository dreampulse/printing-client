import 'babel-polyfill'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import 'sinon-as-promised'
import fetch from 'isomorphic-fetch'

import 'rxjs'
import {Observable} from 'rxjs/Observable'

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon

global.fetch = fetch

global.actionFinished = (store, type) =>
  new Promise(resolve =>
    store.epic$.next(action$ =>
      action$.ofType(type)
        .do(() => setTimeout(resolve, 1))   // after reducer
        .flatMap(() => Observable.empty())  // consumes the action -> stop
    )
  )
