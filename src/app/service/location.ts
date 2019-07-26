import * as localStorageSession from './local-storage-session'

export const reloadPage = () => {
  localStorageSession.disable()
  window.location.reload(true)
}
