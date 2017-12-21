import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import SelectMenuItem from './select-menu-item'
import SelectMenuMaterialItem from './select-menu-material-item'

const getMenuItem = type => {
  if (type === 'material') {
    return SelectMenuMaterialItem
  }
  return SelectMenuItem
}

const SelectMenuGroupItem = ({classNames, modifiers, value, selectedValue, onClick = () => {}}) => (
  <div className={buildClassName('select-menu-group-item', modifiers, classNames)}>
    <strong className="select-menu-group-item__title">{value.label}</strong>
    <ul className="select-menu-group-item__list">
      {value.children.map(child => {
        const Item = getMenuItem(child.type)
        return (
          <li className="select-menu-group-item__item" key={child.value}>
            <Item value={child} selected={child.value === selectedValue} onClick={onClick} />
          </li>
        )
      })}
    </ul>
  </div>
)

SelectMenuGroupItem.propTypes = {
  ...propTypes.component,
  value: PropTypes.shape({
    type: PropTypes.oneOf(['group']).isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        // Only if type is group
        type: PropTypes.oneOf(['regular', 'material']), // Default is regular
        value: PropTypes.string.isRequired,
        label: PropTypes.string, // When not provided value will be shown
        colorValue: propTypes.string, // Optional color square
        colorImage: PropTypes.string, // Optional color image URL
        hasColor: PropTypes.bool, // Only if type is material
        price: PropTypes.string // Only if type is material
      })
    ).isRequired
  }).isRequired,
  selectedValue: PropTypes.string,
  onClick: PropTypes.func
}

export default SelectMenuGroupItem
