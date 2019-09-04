import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import warningIcon from '../../../asset/icon/warning.svg'

const Headline = ({
  classNames,
  label,
  tag = 'h1',
  size = 'default',
  warning = false,
  minor = false,
  light = false,
  invert = false,
  primary = false,
  icon
}) => {
  const finalIcon = warning ? warningIcon : icon

  return React.createElement(
    tag,
    {
      className: cn('Headline', {warning, minor, light, invert, [size]: true, primary}, classNames)
    },
    <>
      {finalIcon && <Icon key="icon" source={finalIcon} />}
      {label}
    </>
  )
}

Headline.propTypes = {
  ...propTypes.component,
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong']),
  label: PropTypes.node.isRequired,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['default', 's', 'l', 'xl']),
  warning: PropTypes.bool,
  minor: PropTypes.bool,
  light: PropTypes.bool,
  invert: PropTypes.bool,
  primary: PropTypes.bool
}

export default Headline
