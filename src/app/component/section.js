import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'

const Section = ({children, ...params}) => (
  <section {...params}>
    {children}
  </section>
)

Section.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default enhanceClassName('section')(Section)

