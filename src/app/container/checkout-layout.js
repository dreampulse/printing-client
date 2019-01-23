import React, {Fragment} from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import {selectCartCount} from '../lib/selector'
import {openIntercom} from '../service/intercom'
import * as navigationAction from '../action/navigation'
import * as modalAction from '../action/modal'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import FooterPartial from './footer-partial'
import Modal from './modal'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
import Button from '../component/button'
import CloseButton from '../component/close-button'
import Headline from '../component/headline'

const CheckoutLayout = ({children, goToUpload, goToCart, cartCount, title}) => {
  const header = (
    <NavBar
      leftContent={
        <Fragment>
          <CloseButton modifiers={['invert', 'l']} onClick={() => goToCart()} />
          <Headline modifiers={['l', 'invert']} label={title} />
        </Fragment>
      }
      rightContent={
        <Fragment>
          <Route path="/" exact>
            {({match}) =>
              !match ? (
                <Button
                  label="Upload"
                  onClick={() => goToUpload()}
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
              goToCart()
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
  )

  return (
    <App header={header} footer={<FooterPartial />}>
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
