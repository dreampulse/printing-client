import {getLocation} from 'Lib/geolocation'

describe('Geolocation e2e Test', function test () {
  this.timeout(20000)

  describe('getLocation()', () => {
    it('should work', async () => {
      const location = await getLocation()
      expect(location.city, 'to be ok')
      expect(location.zipCode, 'to be ok')
      expect(location.stateCode, 'to be ok')
      expect(location.countryCode, 'to be ok')
    })
  })
})
