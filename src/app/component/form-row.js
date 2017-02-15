import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const FormRow = ({classNames, modifiers, children}) => (
  <div className={buildClassName('form-row', modifiers, classNames)}>
    {children}
  </div>
)

FormRow.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default FormRow
