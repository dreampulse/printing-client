import config from '../../../config'

export function getProviderName(providerSlug) {
  return config.providerNames[providerSlug] || providerSlug
}

export function getFinishGroupProviderNames(finishGroupProviderNames) {
  return Object.keys(finishGroupProviderNames).reduce((acc, providerSlug) => {
    acc[getProviderName(providerSlug)] = finishGroupProviderNames[providerSlug]
    return acc
  }, {})
}
