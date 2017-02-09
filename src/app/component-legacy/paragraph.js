import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'

const Paragraph = ({children, ...params}) => (
  <p {...params}>
    {children}
  </p>
)

Paragraph.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default enhanceClassName('paragraph')(Paragraph)

