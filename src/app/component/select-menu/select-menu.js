import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import SelectMenuItem from '../select-menu-item'
import SelectMenuMaterialItem from '../select-menu-material-item'
import SelectMenuGroupItem from '../select-menu-group-item'

const getMenuItem = type => {
  if (type === 'material') {
    return SelectMenuMaterialItem
  }
  if (type === 'group') {
    return SelectMenuGroupItem
  }
  return SelectMenuItem
}

const SelectMenu = ({classNames, modifiers, values, selectedValue, onClick = () => {}}) => (
  <ul className={buildClassName('select-menu', modifiers, classNames)}>
    {values.map(value => {
      const Item = getMenuItem(value.type)
      return (
        <li
          className="select-menu__item"
          key={value.value !== undefined ? value.value : value.label}
        >
          <Item
            value={value}
            selected={selectedValue === value.value}
            selectedValue={selectedValue}
            onClick={onClick}
          />
        </li>
      )
    })}
  </ul>
)

SelectMenu.propTypes = {
  ...propTypes.component,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['regular', 'group', 'material']), // Default is regular
      value: PropTypes.any,
      label: PropTypes.string, // When not provided value will be shown
      colorValue: propTypes.string, // Optional color square
      colorImage: PropTypes.string, // Optional color image URL
      hasColor: PropTypes.bool, // Only if type is material
      price: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          // Only if type is group
          type: PropTypes.oneOf(['regular', 'material']), // Default is regular
          value: PropTypes.string.isRequired,
          label: PropTypes.string, // When not provided value will be shown
          colorValue: propTypes.string, // Optional color square
          colorImage: PropTypes.string, // Optional color image URL
          hasColor: PropTypes.bool, // Only if type is material
          price: PropTypes.string
        })
      )
    })
  ).isRequired,
  selectedValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onClick: PropTypes.func
}

export default SelectMenu
