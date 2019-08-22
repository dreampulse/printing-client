import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import SelectMenuItem from '../select-menu-item'

const SelectMenu = ({classNames, values, selectedValue, onClick = () => {}}) => (
  <ul className={cn('SelectMenu', {}, classNames)}>
    {values.map(value => (
      <li className="SelectMenu__item" key={value.value !== undefined ? value.value : value.label}>
        <SelectMenuItem
          value={value}
          selected={selectedValue === value.value}
          selectedValue={selectedValue}
          onClick={onClick}
        />
      </li>
    ))}
  </ul>
)

SelectMenu.propTypes = {
  ...propTypes.component,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string // When not provided value will be shown
    })
  ).isRequired,
  selectedValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onClick: PropTypes.func
}

export default SelectMenu
