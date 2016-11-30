import React from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

import Icon from './icon'

const SectionHeadline = ({classNames, modifiers, label, icon}) => (
  <h3 className={buildClassName('section-headline', modifiers, classNames)}>
    {icon ? <Icon source={icon} /> : null}
    {label}
  </h3>
)

SectionHeadline.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string
}

export default SectionHeadline
