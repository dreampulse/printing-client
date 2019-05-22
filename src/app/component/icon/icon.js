import PropTypes from 'prop-types'
import React from 'react'

import placeholder from '../../../asset/icon/placeholder.svg'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const Icon = ({block = false, classNames, title, source = placeholder}) => (
  <svg
    className={buildClassName('Icon', {block}, classNames)}
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
  }),
  block: PropTypes.bool
}

export default Icon
