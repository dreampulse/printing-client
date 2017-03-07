import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import SelectMenuItem from 'Component/select-menu-item'
import SelectMenuMaterialItem from 'Component/select-menu-material-item'
import SelectMenuGroupItem from 'Component/select-menu-group-item'

const getMenuItem = (type) => {
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
    {
      values.map((value) => {
        const Item = getMenuItem(value.type)
        return (
          <li className="select-menu__item" key={value.value || value.label}>
            <Item
              value={value}
              selected={selectedValue === value.value}
              selectedValue={selectedValue}
              onClick={onClick}
            />
          </li>
        )
      })
    }
  </ul>
)

SelectMenu.propTypes = {
  ...propTypes.component,
  values: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['regular', 'group', 'material']), // Default is regular
    value: PropTypes.any,
    label: PropTypes.string, // When not provided value will be shown
    colorValue: propTypes.string, // Optional color square
    colorImage: PropTypes.string, // Optional color image URL
    hasColor: PropTypes.bool, // Only if type is material
    price: PropTypes.string, // Only if type is material
    children: PropTypes.arrayOf(PropTypes.shape({ // Only if type is group
      type: PropTypes.oneOf(['regular', 'material']), // Default is regular
      value: PropTypes.string.isRequired,
      label: PropTypes.string, // When not provided value will be shown
      colorValue: propTypes.string, // Optional color square
      colorImage: PropTypes.string, // Optional color image URL
      hasColor: PropTypes.bool, // Only if type is material
      price: PropTypes.string // Only if type is material
    }))
  })).isRequired,
  selectedValue: PropTypes.any,
  onClick: PropTypes.func
}

export default SelectMenu
