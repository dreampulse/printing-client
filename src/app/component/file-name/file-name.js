import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const FileName = ({classNames, name, extension}) => (
  <div className={cn('FileName', {}, classNames)}>
    <div className="FileName__name">{name}</div>
    <div>.{extension}</div>
  </div>
)

FileName.propTypes = {
  ...propTypes.component,
  name: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired
}

export default FileName
