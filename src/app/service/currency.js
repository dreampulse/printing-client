import {getCurrencyList, getCurrencyAbbreviation} from 'country-currency-map'
import {getCountryName} from './country'

const mapCurrencyToSelectModel = currency => ({value: currency.abbr, label: currency.abbr})

const sortValuesAlphabetically = (a, b) => {
  const valueA = a.value.toUpperCase()
  const valueB = b.value.toUpperCase()
  if (valueA < valueB) {
    return -1
  } else if (valueA > valueB) {
    return 1
  }
  return 0
}

const currencies = getCurrencyList()
  .map(mapCurrencyToSelectModel)
  .sort(sortValuesAlphabetically)

export function getCurrencies() {
  return currencies
}

export function getCurrencyForCountry(countryCode) {
  const currency = getCurrencyAbbreviation(getCountryName(countryCode))
  return currency || 'USD'
}
