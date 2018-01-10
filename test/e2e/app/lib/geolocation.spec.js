import {getLocationByIp} from '../../../../src/app/lib/geolocation'

describe('Geolocation e2e Test', function test() {
  this.timeout(20000)

  describe('getLocation()', () => {
    it('should work', async () => {
      const location = await getLocationByIp()
      expect(location.countryCode, 'to be ok')
    })
  })
})
