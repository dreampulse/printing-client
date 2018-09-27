import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const DescriptionList = ({classNames, modifiers = [], children}) => (
  <dl className={buildClassName('description-list', modifiers, classNames)}>{children}</dl>
)

DescriptionList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default DescriptionList
