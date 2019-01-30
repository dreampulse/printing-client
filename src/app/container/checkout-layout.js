import React from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import {selectCartCount} from '../lib/selector'
import {openIntercom} from '../service/intercom'
import * as navigationAction from '../action/navigation'
import * as modalAction from '../action/modal'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import Modal from './modal'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
import Button from '../component/button'
import Logo from '../component/logo'

const CheckoutLayout = ({children, goToUpload, goToCart, cartCount}) => {
  const header = (
    <NavBar
      leftContent={<Logo onClick={() => goToUpload()} />}
      rightContent={
        <>
          <Route path="/" exact>
            {({match}) =>
              !match && (
                <Button
                  label="Upload"
                  onClick={() => goToUpload()}
                  modifiers={['minor', 'compact']}
                />
              )
            }
          </Route>
          <IconLink
            icon={cartIcon}
            disabled={cartCount < 1}
            cartCount={cartCount}
            onClick={event => {
              event.preventDefault()
              goToCart()
            }}
          />
          <IconLink
            icon={helpIcon}
            onClick={event => {
              event.preventDefault()
              openIntercom()
            }}
          />
        </>
      }
    />
  )

  return (
    <App header={header}>
      <Modal />
      <Container>{children}</Container>
    </App>
  )
}

const mapStateToProps = state => ({
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  goToCart: navigationAction.goToCart,
  openAddressFormModal: modalAction.openAddressFormModal
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(CheckoutLayout)
