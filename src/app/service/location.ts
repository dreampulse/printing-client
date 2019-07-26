import * as localStorageSession from './local-storage-session'

export const reloadPage = () => {
  localStorageSession.clear()
  window.location.reload(true)
}
