import React, {PropTypes} from 'react'
import intersection from 'lodash/intersection'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import SelectMenuItem from './select-menu-item'

const SelectMenu = ({classNames, modifiers, values, selectedValue, onClick = () => {}}) => (
  <ul className={buildClassName('select-menu', modifiers, classNames)}>
    {
      values.map(value => (
        <li className="select-menu__item" key={value.value}>
          <SelectMenuItem
            modifiers={intersection(modifiers, ['color'])}
            value={value}
            selected={selectedValue === value.value}
            onClick={onClick}
          />
        </li>
      ))
    }
  </ul>
)

SelectMenu.propTypes = {
  ...propTypes.component,
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string, // When not provided value will be shown
    colorValue: propTypes.string, // Optional color square
    colorImage: PropTypes.string // Optional color image URL
  })).isRequired,
  selectedValue: PropTypes.string,
  onClick: PropTypes.func
}

export default SelectMenu
