import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Container from 'Component/container'

import logoImage from 'Image/logo.svg'

const Header = ({classNames, modifiers, children, onClickIdentity = () => {}}) => (
  <header className={buildClassName('header', modifiers, classNames)}>
    <Container>
      <div className="header__grid">
        <button className="header__identity" type="button" onClick={onClickIdentity}>
          <img className="header__logo" src={logoImage} alt="All3DP" />
          <strong className="header__subline">
            3D Printing Service<br />
            for the Best Price
          </strong>
        </button>
        <div className="header__content">{children}</div>
      </div>
    </Container>
  </header>
)

Header.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  onClickIdentity: PropTypes.func
}

export default Header
