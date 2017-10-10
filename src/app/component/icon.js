import React from 'react'

import placeholder from 'Icon/placeholder.svg'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Icon = ({modifiers, classNames, source = placeholder}) => (
  <svg className={buildClassName('icon', modifiers, classNames)}>
    <use xlinkHref={`#${source.id}`} />
  </svg>
)

Icon.propTypes = {
  ...propTypes.component,
  source: React.PropTypes.shape({
    id: React.PropTypes.string
  })
}

export default Icon
