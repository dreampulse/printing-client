import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'
import ColorSquare from 'Component/color-square'

import selectedIcon from 'Icon/selected.svg'

const getLabel = ({value, label}) => (label || value)

const SelectMenuItem = ({
  classNames,
  modifiers = [],
  value,
  selected = false,
  onClick = () => {}
}) => {
  const handleClick = (event) => {
    event.preventDefault()
    onClick(value)
  }

  const finalModifier = [
    ...modifiers,
    {selected}
  ]

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
    value: PropTypes.string.isRequired,
    label: PropTypes.string, // When not provided value will be shown
    colorValue: propTypes.string, // Optional color square
    colorImage: PropTypes.string // Optional color image URL
  }).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectMenuItem
