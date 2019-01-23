import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const NavBar = ({classNames, leftContent, rightContent}) => (
  <header className={cn('NavBar', {}, classNames)}>
    <div className="NavBar__left">{leftContent}</div>
    {rightContent && <div className="NavBar__right">{rightContent}</div>}
  </header>
)

NavBar.propTypes = {
  ...propTypes.component,
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node
}

export default NavBar
