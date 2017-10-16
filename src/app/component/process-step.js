import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const ProcessStep = ({
  classNames,
  modifiers = [],
  label,
  href = '#',
  onClick
}) => {
  const clickable = onClick && !modifiers.includes('inactive')
  const tag = clickable ? 'a' : 'div'

  return React.createElement(tag, {
    className: buildClassName('process-step', modifiers, classNames),
    href: clickable ? href : undefined,
    onClick: clickable ? onClick : undefined
  }, [
    <span key="point" className="process-step__point" />,
    label
  ])
}

ProcessStep.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default ProcessStep
