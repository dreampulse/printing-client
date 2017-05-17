import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import App from 'Component/app'
import StickyContainer from 'Component/sticky-container'
import Container from 'Component/container'
import Header from 'Component/header'
import ProcessStepBar from 'Component/process-step-bar'
import ProcessStep from 'Component/process-step'
import Footer from 'Component/footer'
import Link from 'Component/link'

import {
  goToHome,
  goToAddress
} from 'Action/navigation'

import Modal from './modal'

const AppLayout = ({
  children,
  configurationHeader,
  currentStep,
  onGoToHome,
  onGoToAddress
}) => {
  const processStepBar = (
    <ProcessStepBar currentStep={currentStep}>
      <ProcessStep
        label="Your Order"
        onClick={(event) => {
          event.preventDefault()
          onGoToHome()
        }}
      />
      <ProcessStep
        label="Address"
        onClick={(event) => {
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
      <Link label="Terms and conditions" href="https://all3dp.com/3dp-price-comparison-terms-of-service/" />
      <Link label="Imprint" href="https://all3dp.com/terms-of-use/#imprint" />
    </Footer>
  )

  return (
    <App
      header={[
        header,
        Boolean(configurationHeader) && (
          <StickyContainer key="configHeader">
            {configurationHeader}
          </StickyContainer>
        )
      ]}
      footer={footer}
    >
      <Modal />
      <Container>
        {children}
      </Container>
    </App>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onGoToHome: goToHome,
  onGoToAddress: goToAddress
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(AppLayout)
