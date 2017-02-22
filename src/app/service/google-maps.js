let googleMaps = null
const defers = []

global.initMap = () => {
  googleMaps = global.google.maps
  defers.forEach(resolve => resolve(googleMaps))
}

export function getGoogleMaps (googleMapsKey) {
  if (googleMaps) {
    return Promise.resolve(googleMaps)
  }

  if (defers.length === 0) {
    const scriptNode = global.document.createElement('script')
    // Places library is needed for location autocomplete input field
    scriptNode.src = `//maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places&callback=initMap`
    global.document.body.insertBefore(scriptNode, global.document.body.firstChild)
  }

  return new Promise((resolve) => {
    defers.push(resolve)
  })
}

export function geocode (_googleMaps, coords) {
  const geocoder = new _googleMaps.Geocoder()

  return new Promise((resolve, reject) => {
    geocoder.geocode({location: coords}, (results, status) => {
      if (status === googleMaps.GeocoderStatus.OK) {
        if (results.length) {
          resolve(results)
        } else {
          reject(new Error('No results found.'))
        }
      } else {
        reject(new Error(`Geocoder failed due to: ${status}`))
      }
    })
  })
}
