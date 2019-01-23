import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const NavBar = ({classNames, modifiers, leftContent, rightContent}) => (
  <header className={buildClassName('nav-bar', modifiers, classNames)}>
    <div className="nav-bar__main">
      <div className="nav-bar__left">{leftContent}</div>
      {rightContent && <div className="nav-bar__right">{rightContent}</div>}
    </div>
  </header>
)

NavBar.propTypes = {
  ...propTypes.component,
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node
}

export default NavBar
