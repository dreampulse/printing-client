import React from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const Link = ({classNames, modifiers, label, href = '#', ...params}) => (
  <a className={buildClassName('link', modifiers, classNames)} href={href} {...params}>
    {label}
  </a>
)

Link.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired
}

export default Link
