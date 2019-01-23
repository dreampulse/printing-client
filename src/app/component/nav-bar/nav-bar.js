import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const NavBar = ({classNames, leftContent, rightContent}) => (
  <header className={buildClassName('NavBar', {}, classNames)}>
    <div className="NavBar__main">
      <div className="NavBar__left">{leftContent}</div>
      {rightContent && <div className="NavBar__right">{rightContent}</div>}
    </div>
  </header>
)

NavBar.propTypes = {
  ...propTypes.component,
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node
}

export default NavBar
