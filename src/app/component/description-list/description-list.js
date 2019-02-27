import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const DescriptionList = ({classNames, alignRight = false, children}) => (
  <dl className={buildClassName('DescriptionList', {alignRight}, classNames)}>{children}</dl>
)

DescriptionList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  alignRight: PropTypes.bool
}

export default DescriptionList
