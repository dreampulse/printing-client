import React from 'react'

import Icon from './icon'
import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const TabItem = ({classNames, modifiers, label, value, icon, onClick = () => {}, ...params}) => {
  const handleOnClick = (event) => {
    event.preventDefault()
    onClick(value)
  }
  return (
    <button
      onClick={handleOnClick}
      className={buildClassName('tab-item', modifiers, classNames)} {...params}
    >
      {icon ? <Icon source={icon} /> : null}
      {label}
    </button>
  )
}

TabItem.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default TabItem
