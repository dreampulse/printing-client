import range from 'lodash/range'

export const selectMenuValues = range(1, 10).map(i => ({
  value: `item${i}`,
  label: `Select Menu Item ${i}`
}))

export const googleMapsApiKey = 'AIzaSyBhZh8C1bG-jR_x6izJexGqNCyHhaPGeyo'

export const currencies = [
  {value: 'USD', label: 'USD'},
  {value: 'EUR', label: 'EUR'},
  {value: 'GBP', label: 'GBP'}
]
