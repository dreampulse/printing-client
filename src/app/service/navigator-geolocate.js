export default function geolocate () {
  if (!('geolocation' in global.navigator)) {
    return Promise.reject(new Error('Navigator API not available.'))
  }

  return new Promise((resolve, reject) => {
    global.navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
