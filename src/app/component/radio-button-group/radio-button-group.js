import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const RadioButtonGroup = ({
  classNames,
  children,
  name,
  value,
  disabled = false,
  onChange = () => {},
  tiny = false
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
      disabled: child.props.disabled || disabled,
      tiny
    })
  )
  return <div className={cn('RadioButtonGroup', {}, classNames)}>{buttons}</div>
}

RadioButtonGroup.propTypes = {
  ...propTypes.component,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  tiny: PropTypes.bool
}

export default RadioButtonGroup
