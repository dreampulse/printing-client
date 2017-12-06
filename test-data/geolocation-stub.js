import * as geolocation from '../src/app/lib/geolocation'
import geolocationSuccessResponse from './mock/geolocation-success-response.json'

geolocation.getLocation = () => Promise.resolve(geolocationSuccessResponse)
