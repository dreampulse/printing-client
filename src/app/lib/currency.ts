import config from '../../../config'
import {currencyByCountry} from '../service/currency'

export const getValidCurrency = (countryCode: string): string => {
  if (config.currencies.map(currency => currency.value).includes(currencyByCountry[countryCode])) {
    return currencyByCountry[countryCode]
  }

  if ((config.defaultCurrencyPerCountry as {[countryCode: string]: string})[countryCode]) {
    return (config.defaultCurrencyPerCountry as {[countryCode: string]: string})[countryCode]
  }

  return config.defaultCurrency
}
