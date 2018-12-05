export default function geolocate() {
  if (!('geolocation' in window.navigator)) {
    return Promise.reject(new Error('Navigator API not available.'))
  }

  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
