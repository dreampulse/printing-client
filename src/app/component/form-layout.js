import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const FormLayout = ({classNames, modifiers, children}) => (
  <div className={buildClassName('form-layout', modifiers, classNames)}>{children}</div>
)

FormLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default FormLayout
