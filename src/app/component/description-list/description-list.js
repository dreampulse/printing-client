import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const DescriptionList = ({
  classNames,
  alignRight = false,
  doubleValues = false,
  block = false,
  topline,
  children
}) => (
  <dl className={buildClassName('DescriptionList', {alignRight, doubleValues, block}, classNames)}>
    {topline && <dd className="DescriptionList__topline">{topline}</dd>}
    {children}
  </dl>
)

DescriptionList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  alignRight: PropTypes.bool,
  doubleValues: PropTypes.bool,
  block: PropTypes.bool,
  topline: PropTypes.node
}

export default DescriptionList
