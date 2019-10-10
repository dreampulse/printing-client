import config from '../../../config'

export const getValidCurrency = (countryCode: string): string => {
  if ((config.defaultCurrencyPerCountry as {[countryCode: string]: string})[countryCode]) {
    return (config.defaultCurrencyPerCountry as {[countryCode: string]: string})[countryCode]
  }

  return config.defaultCurrency
}
