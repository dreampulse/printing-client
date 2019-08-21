import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

export default class RadioButtonGroup extends React.Component {
  static propTypes = {
    ...propTypes.component,
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    tiny: PropTypes.bool
  }

  groupName = uniqueId('button-group-')

  render() {
    const {
      classNames,
      children,
      name = this.groupName,
      value,
      disabled = false,
      onChange = () => {},
      tiny = false
    } = this.props
    const onClick = event => {
      onChange(event.target.value, name, event)
    }
    const buttons = React.Children.map(children, child =>
      cloneElement(child, {
        onClick,
        name,
        checked: value === child.props.value,
        disabled: child.props.disabled || disabled,
        tiny
      })
    )
    return <div className={cn('RadioButtonGroup', {}, classNames)}>{buttons}</div>
  }
}
