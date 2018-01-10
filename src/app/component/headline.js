import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import warningIcon from '../../asset/icon/warning.svg'

const Headline = ({modifiers = [], classNames, label, tag = 'h1', icon}) => {
  const finalIcon = modifiers.indexOf('warning') >= 0 ? warningIcon : icon

  return React.createElement(
    tag,
    {
      className: buildClassName('headline', modifiers, classNames)
    },
    [finalIcon ? <Icon key="icon" source={finalIcon} /> : null, label]
  )
}

Headline.propTypes = {
  ...propTypes.component,
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default Headline
