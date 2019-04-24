import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const UploadModelList = ({classNames}) =>
  <div className={cn('UploadModelList', {}, classNames)} >

  </div>

UploadModelList.propTypes = {
  ...propTypes.component
}

export default UploadModelList
