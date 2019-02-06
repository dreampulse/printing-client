import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const RadioButtonGroup = ({
  classNames,
  modifiers = [],
  children,
  name,
  value,
  disabled = false,
  onChange = () => {}
}) => {
  const onClick = event => {
    onChange(event.target.value, name, event)
  }
  const groupName = name || uniqueId('button-group-')
  const buttons = React.Children.map(children, child =>
    cloneElement(child, {
      onClick,
      name: groupName,
      checked: value === child.props.value,
      disabled: child.props.disabled || disabled
    })
  )
  return (
    <div className={buildClassName('radio-button-group', modifiers, classNames)}>{buttons}</div>
  )
}

RadioButtonGroup.propTypes = {
  ...propTypes.component,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool
}

export default RadioButtonGroup
