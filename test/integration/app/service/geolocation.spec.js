import { getLocation } from '../../../../src/app/service/geolocation'

describe('Geolocation Integration Test', () => {
  describe('getLocation()', () => {
    it('should work', async () => {
      const location = await getLocation()
      expect(location.zipCode, 'to be ok')
    })
  })
})
