import {detectAddress, createUser, updateUser} from 'Action/user'
import * as printingEngine from 'Lib/printing-engine'
import * as geolocation from 'Lib/geolocation'
import Store from '../../../../src/app/store'

describe('User Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(geolocation)
    store = Store()
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(geolocation)
  })

  describe('detectAddress()', () => {
    it('should work', async () => {
      const location = {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }
      geolocation.getLocation.resolves(location)

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

      store = Store({
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
