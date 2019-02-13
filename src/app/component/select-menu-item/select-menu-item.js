import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import selectedIcon from '../../../asset/icon/selected.svg'

const getLabel = ({value, label}) => label || value

// TODO: update component to the new style

const SelectMenuItem = ({
  classNames,
  modifiers = [],
  value,
  selected = false,
  onClick = () => {}
}) => {
  const handleClick = event => {
    event.preventDefault()
    onClick(value, event)
  }

  const finalModifier = [...modifiers, {selected}]

  return (
    <button
      type="button"
      className={buildClassName('select-menu-item', finalModifier, classNames)}
      onClick={handleClick}
    >
      {selected && <Icon source={selectedIcon} />}
      <span className="select-menu-item__label">{getLabel(value)}</span>
      {value.price && <small className="select-menu-item__price">{value.price}</small>}
    </button>
  )
}

SelectMenuItem.propTypes = {
  ...propTypes.component,
  value: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string, // When not provided value will be shown
    price: PropTypes.string
  }).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectMenuItem
