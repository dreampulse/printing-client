// @flow

import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import {selectCartCount} from '../lib/selector'

import type {AppState} from '../reducer'
import {goToUpload, goToCart} from '../action/navigation'
import Modal from './modal'
import {openIntercom} from '../service/intercom'

import FooterPartial from './footer-partial'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
import Button from '../component/button'
import Logo from '../component/logo'

const AppLayout = ({
  children,
  navBarContent,
  headerContent,
  cartCount,
  onHomeClick,
  onUploadClick,
  onCartClick
}) => (
  <App
    header={
      <Fragment>
        <NavBar
          key="navbar"
          leftContent={<Logo onClick={() => onHomeClick()} />}
          rightContent={
            <Fragment>
              {navBarContent}
              <Route path="/" exact>
                {({match}) =>
                  !match ? (
                    <Button
                      label="Upload"
                      onClick={() => onUploadClick()}
                      modifiers={['invert', 'compact']}
                    />
                  ) : null
                }
              </Route>
              <IconLink
                modifiers={['invert']}
                icon={cartIcon}
                disabled={cartCount < 1}
                cartCount={cartCount}
                onClick={event => {
                  event.preventDefault()
                  onCartClick()
                }}
              />
              <IconLink
                modifiers={['invert']}
                icon={helpIcon}
                onClick={event => {
                  event.preventDefault()
                  openIntercom()
                }}
              />
            </Fragment>
          }
        />
        {headerContent}
      </Fragment>
    }
    footer={<FooterPartial />}
  >
    <Container>{children}</Container>
    <Modal />
  </App>
)

const mapStateToProps = (state: AppState) => ({
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  onHomeClick: goToUpload,
  onUploadClick: goToUpload,
  onCartClick: goToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout)
