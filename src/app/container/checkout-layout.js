// @flow

import React, {Fragment} from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import type {AppState} from '../reducer'
import {selectCartCount} from '../lib/selector'
import {openIntercom} from '../service/intercom'
import * as navigationAction from '../action/navigation'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import FooterPartial from './footer-partial'
import Modal from './modal'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import ProcessStepBar from '../component/process-step-bar'
import ProcessStep from '../component/process-step'
import IconLink from '../component/icon-link'
import Button from '../component/button'
import CloseButton from '../component/close-button'
import Headline from '../component/headline'

const CheckoutLayout = ({
  children,
  currentStep,
  goToAddress,
  goToUpload,
  goToCart,
  cartCount,
  title
}) => {
  const processStepBar = (
    <ProcessStepBar currentStep={currentStep}>
      <ProcessStep
        label="Address"
        onClick={event => {
          event.preventDefault()
          goToAddress()
        }}
      />
      <ProcessStep label="Review" />
      <ProcessStep label="Pay" />
    </ProcessStepBar>
  )
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
          {currentStep >= 0 && processStepBar}
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

const mapStateToProps = (state: AppState) => ({
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  goToCart: navigationAction.goToCart,
  goToAddress: navigationAction.goToAddress
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(CheckoutLayout)
