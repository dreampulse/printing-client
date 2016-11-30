import React from 'react'
import placeholder from '../../asset/icon/placeholder.svg'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const Icon = ({source = placeholder, modifiers, classNames}) => (
  <svg className={buildClassName('icon', modifiers, classNames)}>
    <use xlinkHref={source} />
  </svg>
)

Icon.propTypes = {
  ...propTypes.component,
  source: React.PropTypes.string
}

export default Icon
