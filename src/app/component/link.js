import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Link = ({classNames, modifiers, label, href = '#', onClick = () => {}}) => (
  <a className={buildClassName('link', modifiers, classNames)} href={href} onClick={onClick}>
    {label}
  </a>
)

Link.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default Link
