import PropTypes from 'prop-types'
import React from 'react'

import placeholder from 'Icon/placeholder.svg'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Icon = ({modifiers, classNames, title, source = placeholder}) => (
  <svg
    className={buildClassName('icon', modifiers, classNames)}
    role={title ? 'img' : 'presentation'}
  >
    <use xlinkHref={`#${source.id}`} />
    {title && <title>{title}</title>}
  </svg>
)

Icon.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  source: PropTypes.shape({
    id: PropTypes.string
  })
}

export default Icon
