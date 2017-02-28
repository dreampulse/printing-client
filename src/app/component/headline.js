import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import warningIcon from 'Icon/warning.svg'

const Headline = ({modifiers = [], classNames, label, tag = 'h1', icon}) => {
  const finalIcon = modifiers.indexOf('warning') >= 0 ? warningIcon : icon

  return React.createElement(tag, {
    className: buildClassName('headline', modifiers, classNames)
  }, [
    finalIcon ? <Icon key="icon" source={finalIcon} /> : null,
    label
  ])
}

Headline.propTypes = {
  ...propTypes.component,
  tag: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ]),
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default Headline
