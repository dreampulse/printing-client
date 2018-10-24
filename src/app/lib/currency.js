// @flow

import config from '../../../config'
import {currencyByCountry} from '../service/currency'

export const getValidCurrency = (countryCode: string) =>
  config.currencies.map(currency => currency.value).includes(currencyByCountry[countryCode])
    ? currencyByCountry[countryCode]
    : config.defaultCurrency
