import config from '../../../config'
import {currencyByCountry} from '../service/currency'

export const getValidCurrency = (countryCode: keyof typeof currencyByCountry | string): string =>
  config.currencies.map(currency => currency.value).includes((currencyByCountry as any)[countryCode])
    ? (currencyByCountry as any)[countryCode]
    : config.defaultCurrency
