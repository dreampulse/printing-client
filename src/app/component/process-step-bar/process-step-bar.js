import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName, {buildClassArray} from '../../lib/build-class-name'

const ProcessStepBar = ({classNames, modifiers, children, currentStep = 0}) => {
  const modifiedChildren = React.Children.map(children, (child, index) =>
    cloneElement(child, {
      key: child.props.label,
      modifiers: buildClassArray({
        first: index === 0,
        last: index === React.Children.count(children) - 1,
        'last-active': currentStep === index,
        inactive: index > currentStep
      })
    })
  )

  return (
    <div className={buildClassName('process-step-bar', modifiers, classNames)}>
      {modifiedChildren}
    </div>
  )
}

ProcessStepBar.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number
}

export default ProcessStepBar
