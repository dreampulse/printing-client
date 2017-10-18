import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import {
  compose,
  withState
} from 'recompose'

const HandleValue = ({children, value, onChange}) => {
  const change = (input) => {
    if (input.target && typeof input.target.value !== 'undefined') {
      return onChange(input.target.value)
    }
    return onChange(input)
  }

  const modifiedChildren = React.Children.map(children, (child, index) => (
    cloneElement(child, {
      key: index,
      value,
      onChange: change
    })
  ))

  return (
    <div>
      {modifiedChildren}
    </div>
  )
}

HandleValue.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired
}

export default compose(withState('value', 'onChange', props => props.initialValue))(HandleValue)
