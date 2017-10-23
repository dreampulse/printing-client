import config from '../../../config'

function pollImage(url, onLoad, onError) {
  const image = new global.Image()
  image.onload = onLoad
  image.onerror = onError
  image.src = url
}

export default function preloadImage(url) {
  const retries = config.imagePollingRetries
  const interval = config.imagePollingInterval

  return new Promise((resolve, reject) => {
    let tries = 0
    const poll = () =>
      pollImage(url, resolve, () => {
        tries += 1

        if (tries >= retries) {
          reject(new Error(`Image could not be loaded within ${retries} retries!`))
          return
        }

        setTimeout(poll, interval)
      })

    poll()
  })
}
