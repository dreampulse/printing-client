import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'

import Icon from './icon'

const SectionHeadline = ({label, icon, ...params}) => (
  <h3 {...params}>
    {icon ? <Icon source={icon} /> : null}
    {label}
  </h3>
)

SectionHeadline.propTypes = {
  label: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string
}

export default enhanceClassName('section-headline')(SectionHeadline)
