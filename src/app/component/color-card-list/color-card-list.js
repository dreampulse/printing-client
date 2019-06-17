import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ColorCardList = ({classNames, children}) => (
  <div className={cn('ColorCardList', {}, classNames)}>
    <div className="ColorCardList__wrapper">{children}</div>
  </div>
)

ColorCardList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ColorCardList
