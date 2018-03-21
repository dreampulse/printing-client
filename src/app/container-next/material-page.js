import React from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'

import * as navigationAction from '../action-next/navigation'
import FooterPartial from './footer-partial'

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
        </OverlayHeaderBar>
      ]}
      footer={<FooterPartial />}
    >
      <Container>TODO</Container>
    </App>
  )
}

const mapStateToProps = _state => ({})

const mapDispatchToProps = {
  onClosePage: navigationAction.goToUpload
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MaterialPage)
