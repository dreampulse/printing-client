import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import {parseFileName} from '../../lib/file'

const FileName = ({classNames, fileName}) => {
  const {name, extension} = parseFileName(fileName)
  return (
    <span className={cn('FileName', {}, classNames)}>
      <span className="FileName__name">{name}</span>
      <span>.{extension}</span>
    </span>
  )
}

FileName.propTypes = {
  ...propTypes.component,
  fileName: PropTypes.string.isRequired
}

export default FileName
