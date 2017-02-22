import React from 'react'

import placeholder from '../../asset/icon/placeholder.svg'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Icon = ({modifiers, classNames, source = placeholder}) => (
  <svg className={buildClassName('icon', modifiers, classNames)}>
    <use xlinkHref={source} />
  </svg>
)

Icon.propTypes = {
  ...propTypes.component,
  source: React.PropTypes.string
}

export default Icon
