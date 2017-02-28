import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'

const Link = ({label, href = '#', ...params}) => (
  <a href={href} {...params}>
    {label}
  </a>
)

Link.propTypes = {
  label: React.PropTypes.string.isRequired,
  href: React.PropTypes.string
}

export default enhanceClassName('link')(Link)
