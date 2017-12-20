import {Cmd} from 'redux-loop'

import * as userAction from '../../../../src/app/action-next/user'
import {selectLocation} from '../../../../src/app/selector'
import reducer from '../../../../src/app/reducer'

describe('user action', () => {
  describe('updateLocation()', () => {
    let location
    let state

    beforeEach(() => {
      location = {
        city: 'some-city',
        zipCode: 'some-zip-code',
        stateCode: 'some-state-code',
        countryCode: 'some-country-code'
      }
      state = reducer(undefined, userAction.updateLocation(location))
    })

    describe('using selectLocation() selector', () => {
      it('returns the updated location', () =>
        expect(selectLocation(getModel(state)), 'to equal', location))
    })
  })
})
