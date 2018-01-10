import createHistory from 'history/createMemoryHistory'
import {detectAddress, createUser, updateUser} from '../../../../src/app/action/user'
import * as navigation from '../../../../src/app/action/navigation'
import * as modal from '../../../../src/app/action/modal'
import * as price from '../../../../src/app/action/price'
import * as printingEngine from '../../../../src/app/service/printing-engine'
import * as geolocation from '../../../../src/app/lib/geolocation'

describe('User Integration Test', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox.stub(printingEngine)
    sandbox.stub(geolocation)
    sandbox.stub(navigation)
    sandbox.stub(modal)
    sandbox.stub(price)

    store = createLegacyStore(createHistory())
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('detectAddress()', () => {
    it('should work', async () => {
      const location = {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }
      geolocation.getLocationByIp.resolves(location)

      await store.dispatch(detectAddress())

      expect(store.getState().user.user.shippingAddress, 'to equal', location)
    })
  })

  describe('createUser()', () => {
    it('should work', async () => {
      const userId = '789'
      printingEngine.createUser.resolves({userId})

      await store.dispatch(createUser())
      expect(store.getState().user, 'to satisfy', {
        userId
      })
    })
  })

  describe('updateUser()', () => {
    it('should work', async () => {
      const userId = '789'
      const user = {someUserInfo: 'something'}

      store = createLegacyStore(createHistory(), {
        user: {
          userId
        }
      })

      printingEngine.updateUser.resolves(user)

      await store.dispatch(updateUser(user))

      expect(store.getState().user, 'to satisfy', {
        userId,
        user
      })
      expect(printingEngine.updateUser, 'was called with', {
        userId,
        user
      })
    })
  })
})
