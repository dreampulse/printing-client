import { getLocation } from '../../../../src/app/service/geolocation'

describe('Geolocation Integration Test', function () {
  this.timeout(20000)

  describe('getLocation()', () => {
    it('should work', async () => {
      const location = await getLocation()
      expect(location.countryCode, 'to be ok')
    })
  })
})
