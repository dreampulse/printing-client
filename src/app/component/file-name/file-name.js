import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const FileName = ({classNames, name, extension}) => (
  <span className={cn('FileName', {}, classNames)}>
    <span className="FileName__name">{name}</span>
    <span>.{extension}</span>
  </span>
)

FileName.propTypes = {
  ...propTypes.component,
  name: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired
}

export default FileName
