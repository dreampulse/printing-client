import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const FormRow = ({classNames, modifiers, children}) => {
  const mappedChildren = React.Children.map(children, child => (
    <div className="form-row__column">{child}</div>
  ))

  return <div className={buildClassName('form-row', modifiers, classNames)}>{mappedChildren}</div>
}

FormRow.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default FormRow
