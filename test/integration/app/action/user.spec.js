import { detectAddress, createUser } from '../../../../src/app/action/user'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as geolocation from '../../../../src/app/service/geolocation'

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

    it('should fail', async () => {
      geolocation.getLocation.rejects(new Error('Boom!'))

      await store.dispatch(detectAddress())

      expect(store.getState().user, 'to satisfy', {
        addressDetectionFailed: true
      })
    })
  })

  describe('createUser()', () => {
    it('should work', async () => {
      const userId = '789'
      printingEngine.createUser.resolves({ userId })

      await store.dispatch(createUser())

      expect(store.getState().user, 'to satisfy', {
        userId
      })
    })
  })
})
