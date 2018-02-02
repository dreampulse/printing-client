import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import {compose, withState} from 'recompose'

const HandleChecked = ({
  children,
  checked,
  onChange,
  checkedName = 'checked',
  onChangeName = 'onChange'
}) => {
  const change = input => {
    if (input.target && typeof input.target.checked !== 'undefined') {
      return onChange(input.target.checked)
    }
    return onChange(input)
  }

  const modifiedChildren = React.Children.map(children, (child, index) =>
    cloneElement(child, {
      key: index,
      [checkedName]: checked,
      [onChangeName]: change
    })
  )

  return <div>{modifiedChildren}</div>
}

HandleChecked.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired,
  checkedName: PropTypes.string,
  onChangeName: PropTypes.string
}

export default compose(withState('checked', 'onChange', props => props.checked))(HandleChecked)
