import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import selectedIcon from '../../asset/icon/selected.svg'

const getLabel = ({value, label}) => label || value

const SelectMenuMaterialItem = ({
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
  const finalModifier = [
    ...modifiers,
    {
      selected,
      'has-color': value.hasColor
    }
  ]

  return (
    <button
      type="button"
      className={buildClassName('select-menu-material-item', finalModifier, classNames)}
      onClick={handleClick}
    >
      {selected && <Icon source={selectedIcon} />}
      <span className="select-menu-material-item__label">{getLabel(value)}</span>
      <span className="select-menu-material-item__color" />
    </button>
  )
}

SelectMenuMaterialItem.propTypes = {
  ...propTypes.component,
  value: PropTypes.shape({
    type: PropTypes.oneOf(['material']),
    value: PropTypes.any.isRequired,
    label: PropTypes.string, // When not provided value will be shown
    hasColor: PropTypes.bool
  }).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectMenuMaterialItem
