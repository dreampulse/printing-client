import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Section = ({classNames, modifiers, children}) => (
  <section className={buildClassName('section', modifiers, classNames)}>
    {children}
  </section>
)

Section.propTypes = {
  ...propTypes.component,
  children: PropTypes.node
}

export default Section
