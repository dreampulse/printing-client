import range from 'lodash/range'

export const selectMenuValues = range(1, 10)
  .map(i => ({value: `item${i}`, label: `Select Menu Item ${i}`}))

export const selectMenuColorValues = [
  {value: 'value1', colorValue: '#ffffff', label: 'Color 1'},
  {value: 'value2', colorValue: '#ff0000', label: 'Color 2'},
  {value: 'value3', colorValue: '#00ff00', label: 'Color 3'},
  {value: 'value4', colorValue: '#0000ff', label: 'Color 4'},
  {value: 'value5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
]

const materialChildren = prefix => range(1, 10)
  .map(i => ({
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

export const selectMenuMaterialValues = [{
  value: 'regular-item1',
  label: 'Regular Item'
}, {
  type: 'group',
  label: 'Group Item 1',
  children: materialChildren('group1')
}, {
  type: 'group',
  label: 'Group Item 2',
  children: materialChildren('group2')
}]

export const googleMapsApiKey = 'AIzaSyBhZh8C1bG-jR_x6izJexGqNCyHhaPGeyo'
