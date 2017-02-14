import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ProcessStep = ({classNames, modifiers, label}) => (
  <div className={buildClassName('process-step', modifiers, classNames)}>
    <span className="process-step__point" />
    {label}
  </div>
)

ProcessStep.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired
}

export default ProcessStep
