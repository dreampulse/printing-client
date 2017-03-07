function pollImage (url, onLoad, onError) {
  const image = new global.Image()
  image.onload = onLoad
  image.onerror = onError
  image.src = url
}

export default function preloadImage (url, retries = 5) {
  return new Promise((resolve, reject) => {
    let tries = 0
    const poll = () => pollImage(url, resolve, () => {
      tries += 1

      if (tries >= retries) {
        reject(new Error(`Image could not be loaded within ${retries} retries!`))
        return
      }

      setTimeout(poll, 1000)
    })

    poll()
  })
}
