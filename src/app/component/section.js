import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

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
