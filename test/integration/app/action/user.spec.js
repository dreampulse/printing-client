import { createUser } from '../../../../src/app/action/user'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as geolocation from '../../../../src/app/service/geolocation'

describe('User Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(geolocation)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(geolocation)
  })

  describe('createUser()', () => {
    it('should work', async () => {
      const userId = '789'
      const location = {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }

      store = Store()

      geolocation.getLocation.resolves(location)
      printingEngine.createUser.resolves({ userId })

      await store.dispatch(createUser())

      expect(store.getState().user, 'to equal', {
        userId
      })
    })
  })
})
