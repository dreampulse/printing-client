import range from 'lodash/range'

export const selectMenuValues = range(1, 10).map(i => ({
  value: `item${i}`,
  label: `Select Menu Item ${i}`
}))

const materialChildren = prefix =>
  range(1, 10).map(i => ({
    type: 'material',
    value: `${prefix}-item${i}`,
    label: `Select Menu Item ${i}`,
    hasColor: true,
    price: 'From $19.99'
  }))

export const selectMenuGroupItemValue = {
  type: 'group',
  label: 'Select Menu Group Item',
  children: materialChildren('group')
}

export const selectMenuMaterialValues = [
  {
    value: 'regular-item1',
    label: 'Regular Item'
  },
  {
    type: 'group',
    label: 'Group Item 1',
    children: materialChildren('group1')
  },
  {
    type: 'group',
    label: 'Group Item 2',
    children: materialChildren('group2')
  }
]

export const googleMapsApiKey = 'AIzaSyBhZh8C1bG-jR_x6izJexGqNCyHhaPGeyo'

export const currencies = [
  {value: 'USD', label: 'USD'},
  {value: 'EUR', label: 'EUR'},
  {value: 'GBP', label: 'GBP'}
]
