import {userCreated} from '../../../../src/app/lib/user'
import * as mixpanelService from '../../../../src/app/service/mixpanel'
import * as loggingService from '../../../../src/app/service/logging'

describe('User lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(mixpanelService)
    sandbox.stub(loggingService)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('userCreated()', () => {
    beforeEach(() => userCreated('some-user-id'))

    it('calls identify with the userId', () =>
      expect(mixpanelService.identify, 'to have a call satisfying', ['some-user-id']))

    it('calls setUserContext with the userId', () =>
      expect(loggingService.setUserContext, 'to have a call satisfying', ['some-user-id']))
  })
})
