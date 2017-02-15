import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import selectedIcon from '../../asset/icon/selected.svg'
import hasColorIcon from '../../asset/icon/placeholder.svg'

const getLabel = ({value, label}) => (label || value)

const SelectMenuMaterialItem = ({
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
      className={buildClassName('select-menu-material-item', finalModifier, classNames)}
      onClick={handleClick}
    >
      {selected && <Icon source={selectedIcon} />}
      <span className="select-menu-material-item__label">{getLabel(value)}</span>
      <span className="select-menu-material-item__color">
        {Boolean(value.hasColor) && <Icon source={hasColorIcon} />}
      </span>
      <span className="select-menu-material-item__price">{value.price}</span>
    </button>
  )
}

SelectMenuMaterialItem.propTypes = {
  ...propTypes.component,
  value: PropTypes.shape({
    type: PropTypes.oneOf(['material']),
    value: PropTypes.string.isRequired,
    label: PropTypes.string, // When not provided value will be shown
    hasColor: PropTypes.bool,
    price: PropTypes.string
  }).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectMenuMaterialItem
