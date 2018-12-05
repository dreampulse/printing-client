let googleMaps: any = null
const defers: any[] = []

window.initMap = () => {
  googleMaps = google.maps
  defers.forEach(resolve => resolve(googleMaps))
}

export function getGoogleMaps(googleMapsKey: string) {
  if (googleMaps) {
    return Promise.resolve(googleMaps)
  }

  if (defers.length === 0) {
    const scriptNode = window.document.createElement('script')
    // Places library is needed for location autocomplete input field
    scriptNode.src = `//maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places&callback=initMap`
    document.body.insertBefore(scriptNode, document.body.firstChild)
  }

  return new Promise(resolve => {
    defers.push(resolve)
  })
}

export function geocode(googleMapsInstance: any, coords: google.maps.LatLng | google.maps.LatLngLiteral) {
  const geocoder: google.maps.Geocoder = new googleMapsInstance.Geocoder()

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
