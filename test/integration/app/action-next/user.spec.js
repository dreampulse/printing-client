import * as coreAction from '../../../../src/app/action-next/core'
import * as userAction from '../../../../src/app/action-next/user'
import * as printingEngine from '../../../../src/app/service/printing-engine'
import {selectLocation, selectUserId} from '../../../../src/app/selector'
import * as userLib from '../../../../src/app/lib/user'
import reducer from '../../../../src/app/reducer'

import createUserMock from '../../../mock/printing-engine/create-user'
import getLocationByIpMock from '../../../mock/printing-engine/get-location-by-ip'

describe('user action', () => {
  describe('locationDetected()', () => {
    let location
    let state

    beforeEach(() => {
      location = getLocationByIpMock()
      state = reducer(undefined, userAction.locationDetected(location))
    })

    describe('using selectLocation() selector', () => {
      it('returns the updated location', () =>
        expect(selectLocation(getModel(state)), 'to equal', location))
    })

    it('triggers the userAction.userCreated() action with the result from createUser', () => {
      const cmd = findCmd(state, printingEngine.createUser, [
        getModel(state).user.currency,
        location
      ])
      const action = cmd.simulate({
        success: true,
        result: createUserMock()
      })
      expect(action, 'to equal', userAction.userCreated(createUserMock().userId))
    })

    it('triggers the coreAction.fatalError() action when createUser failed', () => {
      const err = new Error('some-error')
      const cmd = findCmd(state, printingEngine.createUser, [
        getModel(state).user.currency,
        location
      ])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', coreAction.fatalError(err))
    })
  })

  describe('userCreated()', () => {
    let state
    let userId

    beforeEach(() => {
      userId = createUserMock().userId
      state = reducer(undefined, userAction.userCreated(userId))
    })

    describe('using selectUserId() selector', () => {
      it('returns the updated userId', () =>
        expect(selectUserId(getModel(state)), 'to equal', userId))
    })

    it('creates the correct userLib.userCreated command', () =>
      findCmd(state, userLib.userCreated, [userId]))
  })
})
