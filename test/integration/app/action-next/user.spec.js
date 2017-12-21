import * as userAction from '../../../../src/app/action-next/user'
import {selectLocation} from '../../../../src/app/selector'
import reducer from '../../../../src/app/reducer'

describe('user action', () => {
  describe('locationDetected()', () => {
    let location
    let state

    beforeEach(() => {
      location = {
        city: 'some-city',
        zipCode: 'some-zip-code',
        stateCode: 'some-state-code',
        countryCode: 'some-country-code'
      }
      state = reducer(undefined, userAction.locationDetected(location))
    })

    describe('using selectLocation() selector', () => {
      it('returns the updated location', () =>
        expect(selectLocation(getModel(state)), 'to equal', location))
    })
  })
})
