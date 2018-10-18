import config from '../../../config'

export function getProviderName(providerSlug) {
  return config.providerNames[providerSlug] || providerSlug
}
