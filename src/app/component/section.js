import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Section = ({classNames, modifiers, children, id}) => (
  <section className={buildClassName('section', modifiers, classNames)} id={id}>
    {children}
  </section>
)

Section.propTypes = {
  ...propTypes.component,
  children: PropTypes.node,
  id: PropTypes.string
}

export default Section
