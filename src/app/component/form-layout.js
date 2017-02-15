import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const FormLayout = ({classNames, modifiers, children}) => (
  <div className={buildClassName('form-layout', modifiers, classNames)}>
    {children}
  </div>
)

FormLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default FormLayout
