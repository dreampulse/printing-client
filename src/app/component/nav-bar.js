import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Container from './container'

import logoImage from '../../asset/image/logo.svg'

const NavBar = ({classNames, modifiers, children, onClickIdentity = () => {}}) => (
  <header className={buildClassName('nav-bar', modifiers, classNames)}>
    <Container>
      <div className="nav-bar__grid">
        <button className="nav-bar__identity" type="button" onClick={onClickIdentity}>
          <img className="nav-bar__logo" src={logoImage} alt="All3DP" />
          <strong className="nav-bar__subline">
            Price Comparison Service for<br />
            Industrial Grade 3D Printing
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
