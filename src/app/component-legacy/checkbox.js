import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'
import Icon from './icon'
import checkIcon from '../../asset-legacy/icon/check.svg'

const Checkbox = ({classNames, modifiers = [], checked, ...params}) => {
  let checkboxModifiers = modifiers

  if (checked) {
    checkboxModifiers = [...checkboxModifiers, 'checked']
  }

  return (
    <div className={buildClassName('checkbox', checkboxModifiers, classNames)}>
      <input className="checkbox__input" type="checkbox" {...params} />
      <div className="checkbox__checked-icon">
        <Icon source={checkIcon} />
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  ...propTypes.component,
  checked: React.PropTypes.bool
}

export default Checkbox
