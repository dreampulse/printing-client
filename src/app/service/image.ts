import config from '../../../config'

export const createPollHandle = (onPollSuccess: () => void) => {
  const image = new Image()
  let timeout: number

  const startPoll = (src: string = image.src): void => {
    clearTimeout(timeout)
    image.src = src
  }

  const onLoadSuccess = () => {
    onPollSuccess()
  }

  const onLoadError = () => {
    timeout = setTimeout(startPoll, config.imagePollingInterval)
  }

  image.addEventListener('load', onLoadSuccess)
  image.addEventListener('error', onLoadError)

  return {
    startPoll,
    dispose(): void {
      clearTimeout(timeout)
      image.removeEventListener('load', onLoadSuccess)
      image.removeEventListener('error', onLoadError)
    }
  }
}
