import config from '../../../config'

import * as localStorage from './local-storage'

export const clear = () => {
  localStorage.removeItem(config.localStorageSessionKey)
}

export const save = <S>(state: S) => {
  localStorage.setItem(config.localStorageSessionKey, {
    state,
    timestamp: new Date()
  })
}

export const hasValidSession = () => {
  const localSession = localStorage.getItem<{timestamp: Date}>(config.localStorageSessionKey)

  if (!localSession) return false

  const timeDiff = new Date().getTime() - new Date(localSession.timestamp).getTime()

  if (timeDiff / 1000 < config.localStorageSessionLiveTime) {
    return true
  }

  return false
}

export const get = <S>() => {
  const localSession = localStorage.getItem<{state: S}>(config.localStorageSessionKey)
  return localSession && localSession.state
}
