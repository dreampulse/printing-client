import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Container from '../container'

import logoImage from '../../../asset/image/logo.svg'

const NavBar = ({classNames, modifiers, children, onClickIdentity = () => {}}) => (
  <header className={buildClassName('nav-bar', modifiers, classNames)}>
    <Container>
      <div className="nav-bar__main">
        <button className="nav-bar__identity" type="button" onClick={onClickIdentity}>
          <img className="nav-bar__logo" src={logoImage} alt="All3DP" />
          <strong className="nav-bar__subline">
            3D Printing Price<br />
            Comparison Service
          </strong>
        </button>
        <div className="nav-bar__content">{children}</div>
      </div>
    </Container>
  </header>
)

NavBar.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  onClickIdentity: PropTypes.func
}

export default NavBar