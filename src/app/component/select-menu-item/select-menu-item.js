import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'
import ColorSquare from '../color-square'

import selectedIcon from '../../../asset/icon/selected.svg'

const getLabel = ({value, label}) => label || value

const SelectMenuItem = ({
  classNames,
  modifiers = [],
  value,
  selected = false,
  onClick = () => {}
}) => {
  const handleClick = event => {
    event.preventDefault()
    onClick(value)
  }

  const finalModifier = [...modifiers, {selected}]

  return (
    <button
      type="button"
      className={buildClassName('select-menu-item', finalModifier, classNames)}
      onClick={handleClick}
    >
      {selected && <Icon source={selectedIcon} />}
      {(value.colorValue || value.colorImage) && (
        <ColorSquare color={value.colorValue} image={value.colorImage} />
      )}
      <span className="select-menu-item__label">{getLabel(value)}</span>
    </button>
  )
}

SelectMenuItem.propTypes = {
  ...propTypes.component,
  value: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string, // When not provided value will be shown
    colorValue: propTypes.string, // Optional color square
    colorImage: PropTypes.string // Optional color image URL
  }).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectMenuItem
