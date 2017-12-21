import React from 'react'
import {compose} from 'recompose'

import App from '../component/app'
import StickyContainer from '../component/sticky-container'
import Container from '../component/container'
import Header from '../component/header'
import ProcessStepBar from '../component/process-step-bar'
import ProcessStep from '../component/process-step'
import Footer from '../component/footer'
import Link from '../component/link'

import {goToHome, goToAddress} from '../action/navigation'

import {connectLegacy} from './util/connect-legacy'
import Modal from './modal'

const AppLayout = ({
  children,
  configurationHeader,
  currentStep,
  isDirectSales,
  onGoToHome,
  onGoToAddress
}) => {
  const processStepBar = (
    <ProcessStepBar currentStep={currentStep}>
      <ProcessStep
        label={isDirectSales ? 'Overview' : 'Your Order'}
        onClick={event => {
          event.preventDefault()
          onGoToHome()
        }}
      />
      <ProcessStep
        label="Address"
        onClick={event => {
          event.preventDefault()
          onGoToAddress()
        }}
      />
      <ProcessStep label="Review and Pay" />
    </ProcessStepBar>
  )
  const header = (
    <Header key="header" onClickIdentity={onGoToHome}>
      {currentStep >= 0 ? processStepBar : <div />}
    </Header>
  )

  const footer = (
    <Footer copyline="© Copyright 2017 ALL3DP GmbH">
      <Link label="Contact Us" href="mailto:support@all3dp.com" />
      <Link
        label="Terms and conditions"
        target="_blank"
        href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
      />
      <Link label="Imprint" target="_blank" href="https://all3dp.com/terms-of-use/#imprint" />
    </Footer>
  )

  return (
    <App
      header={[
        header,
        Boolean(configurationHeader) && (
          <StickyContainer key="configHeader">{configurationHeader}</StickyContainer>
        )
      ]}
      footer={footer}
    >
      <Modal />
      <Container>{children}</Container>
    </App>
  )
}

const mapStateToProps = state => ({
  isDirectSales: state.configuration.isDirectSales
})

const mapDispatchToProps = {
  onGoToHome: goToHome,
  onGoToAddress: goToAddress
}

const enhance = compose(connectLegacy(mapStateToProps, mapDispatchToProps))

export default enhance(AppLayout)
