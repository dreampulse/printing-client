import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import selectedIcon from '../../../asset/icon/selected.svg'

const getLabel = ({value, label}) => label || value

const SelectMenuItem = ({classNames, value, selected = false, onClick = () => {}}) => {
  const handleClick = event => {
    event.preventDefault()
    onClick(value, event)
  }

  return (
    <button
      type="button"
      className={cn('SelectMenuItem', {selected}, classNames)}
      onClick={handleClick}
    >
      {selected && <Icon source={selectedIcon} />}
      <span className="SelectMenuItem__label">{getLabel(value)}</span>
    </button>
  )
}

SelectMenuItem.propTypes = {
  ...propTypes.component,
  value: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string // When not provided value will be shown
  }).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectMenuItem
