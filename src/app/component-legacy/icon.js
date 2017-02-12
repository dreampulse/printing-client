import React from 'react'
import placeholder from '../../asset-legacy/icon/placeholder.svg'

import enhanceClassName from '../lib/enhance-class-name'

const Icon = ({source = placeholder, ...params}) => (
  <svg {...params}>
    <use xlinkHref={source} />
  </svg>
)

Icon.propTypes = {
  source: React.PropTypes.string
}

export default enhanceClassName('icon')(Icon)
