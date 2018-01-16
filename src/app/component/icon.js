import PropTypes from 'prop-types'
import React from 'react'

import placeholder from '../../asset/icon/placeholder.svg'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

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
