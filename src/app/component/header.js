import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Container from './container'
import Grid from './grid'

import logoImage from '../../asset/image/logo.svg'

const Header = ({classNames, modifiers, children}) => (
  <header className={buildClassName('header', modifiers, classNames)}>
    <Container>
      <Grid>
        <div className="header__identity">
          <img className="header__logo" src={logoImage} alt="All3DP" />
          <strong className="header__subline">
            3D Printing Service<br />
            for the Best Price
          </strong>
        </div>
        <div className="header__content">
          {children}
        </div>
      </Grid>
    </Container>
  </header>
)

Header.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Header

