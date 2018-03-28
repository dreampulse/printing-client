// @flow

import React from 'react'
import {connect} from 'react-redux'

import * as navigationAction from '../action-next/navigation'
import FooterPartial from './footer-partial'
import ConfigurationHeaderPartial from './configuration-header-partial'
import type {AppState} from '../reducer-next'

import App from '../component/app'
import Container from '../component/container'
import OverlayHeaderBar from '../component/overlay-header-bar'
import ProviderProgressBar from '../component/provider-progress-bar'

const MaterialPage = ({onClosePage}) => {
  // TODO:
  const title = 'Choose material (TODO)'
  const numCheckedProviders = 1
  const numTotalProviders = 3

  return (
    <App
      header={[
        <OverlayHeaderBar key="header-bar" onClickClose={onClosePage} title={title}>
          <ProviderProgressBar currentStep={numCheckedProviders} totalSteps={numTotalProviders} />
        </OverlayHeaderBar>,
        <ConfigurationHeaderPartial key="configuration-header" />
      ]}
      footer={<FooterPartial />}
    >
      <Container>TODO</Container>
    </App>
  )
}

const mapStateToProps = (_state: AppState) => ({})

const mapDispatchToProps = {
  onClosePage: navigationAction.goToUpload
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialPage)
