import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import {compose, withState} from 'recompose'

const HandleValue = ({
  children,
  value,
  onChange,
  valueName = 'value',
  onChangeName = 'onChange'
}) => {
  const change = input => {
    if (input.target && typeof input.target.checked !== 'undefined') {
      return onChange(input.target.checked)
    }
    if (input.target && typeof input.target.value !== 'undefined') {
      return onChange(input.target.value)
    }
    return onChange(input)
  }

  const modifiedChildren = React.Children.map(children, (child, index) =>
    cloneElement(child, {
      key: index,
      [valueName]: value,
      [onChangeName]: change
    })
  )

  return <div>{modifiedChildren}</div>
}

HandleValue.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired,
  valueName: PropTypes.string,
  onChangeName: PropTypes.string
}

export default compose(withState('value', 'onChange', props => props.initialValue))(HandleValue)
