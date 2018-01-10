import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

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
