import config from '../../../config'

export function getProviderName(providerSlug: keyof typeof config.providerNames) {
  return config.providerNames[providerSlug] || providerSlug
}
