// @flow

import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import type {AppState} from '../reducer-next'
import FooterPartial from './footer-partial'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import {selectModelConfigs} from '../selector'

import {goToUpload, goToCart} from '../action-next/navigation'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
import Button from '../component/button'

const AppLayout = ({children, cartCount, onHomeClick, onUploadClick, onCartClick, onHelpClick}) => (
  <App
    header={
      <NavBar key="navbar" onClickIdentity={onHomeClick}>
        <Route path="/" exact>
          {({match}) =>
            !match ? (
              <Button label="Upload" onClick={onUploadClick} modifiers={['invert', 'compact']} />
            ) : null}
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
            onHelpClick()
          }}
        />
      </NavBar>
    }
    footer={<FooterPartial />}
  >
    <Container>{children}</Container>
  </App>
)

const mapStateToProps = (state: AppState) => ({
  cartCount: selectModelConfigs(state).filter(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId !== null
  ).length
})

const mapDispatchToProps = {
  onHomeClick: goToUpload,
  onUploadClick: goToUpload,
  onCartClick: goToCart,
  onHelpClick: () => {} /* TODO */
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)
