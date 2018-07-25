import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import App from '../component/app'
import Container from '../component/container'
import OverlayHeaderBar from '../component/overlay-header-bar'
import ProcessStepBar from '../component/process-step-bar'
import ProcessStep from '../component/process-step'
import IconLink from '../component/icon-link'

import FooterPartial from './footer-partial'

import helpIcon from '../../../src/asset/icon/help.svg'

import Modal from './modal'

const CheckoutLayout = ({children, currentStep, onPush, title}) => {
  const processStepBar = (
    <ProcessStepBar currentStep={currentStep}>
      <ProcessStep
        label="Address"
        onClick={event => {
          event.preventDefault()
          onPush('/address')
        }}
      />
      <ProcessStep label="Review" />
      <ProcessStep label="Pay" />
    </ProcessStepBar>
  )
  const header = (
    <OverlayHeaderBar
      title={title}
      onClickClose={() => onPush('/cart')}
      actions={[
        <IconLink
          key="help"
          // TODO: define help link
          onClick={() => onPush('/help')}
          modifiers={['invert', 'l']}
          icon={helpIcon}
        />
      ]}
    >
      {currentStep >= 0 && processStepBar}
    </OverlayHeaderBar>
  )

  return (
    <App header={header} footer={<FooterPartial />}>
      <Modal />
      <Container>{children}</Container>
    </App>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onPush: push
}

const enhance = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhance(CheckoutLayout)
