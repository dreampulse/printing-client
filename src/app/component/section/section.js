import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Section = ({classNames, children, id}) => (
  <section className={cn('Section', {}, classNames)} id={id}>
    {children}
  </section>
)

Section.propTypes = {
  ...propTypes.component,
  children: PropTypes.node,
  id: PropTypes.string
}

export default Section
