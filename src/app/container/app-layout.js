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

import Modal from './modal'

const AppLayout = ({
  children,
  configurationHeader,
  currentStep
}) => {
  const processStepBar = (
    <ProcessStepBar currentStep={currentStep}>
      <ProcessStep label="Your Order" />
      <ProcessStep label="Address" />
      <ProcessStep label="Review and Pay" />
    </ProcessStepBar>
  )
  const header = (
    <Header key="header">
      {currentStep >= 0 ? processStepBar : <div />}
    </Header>
  )

  const footer = (
    <Footer copyline="© Copyright 2017 ALL3DP GmbH">
      <Link label="Terms and conditions" href="#" />
      <Link label="Imprint" href="#" />
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

const mapDispatchToProps = {}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(AppLayout)
