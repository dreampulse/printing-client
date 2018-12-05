import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'

import * as navigationAction from '../action/navigation'

import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  selectUploadedModelConfigs
} from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'

import FooterPartial from './footer-partial'
import ConfigurationHeaderPartial from './configuration-header-partial'
import MaterialPartial from './material-partial'
import Modal from './modal'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import ProviderProgressBar from '../component/provider-progress-bar'
import CloseButton from '../component/close-button'
import Headline from '../component/headline'

const EditMaterialPage = ({goToCart, pollingProgress, configIds, uploadedModelConfigs}) => {
  const title = `Edit material (${configIds.length} of ${uploadedModelConfigs.length} items)`
  const numCheckedProviders = pollingProgress.complete || 0
  const numTotalProviders = pollingProgress.total || 0

  return (
    <App
      header={[
        <NavBar
          key="header-bar"
          leftContent={
            <Fragment>
              <CloseButton
                modifiers={['invert', 'l']}
                onClick={() => goToCart({selectModelConfigIds: configIds})}
              />
              <Headline modifiers={['l', 'invert']} label={title} />
            </Fragment>
          }
          rightContent={
            <ProviderProgressBar currentStep={numCheckedProviders} totalSteps={numTotalProviders} />
          }
        />,
        <ConfigurationHeaderPartial key="configuration-header" />
      ]}
      footer={<FooterPartial />}
    >
      <Container>
        <MaterialPartial configIds={configIds} />
      </Container>
      <Modal />
    </App>
  )
}

const mapStateToProps = (state, ownProps) => ({
  pollingProgress: selectQuotePollingProgress(state),
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  currency: state.core.currency,
  location: state.core.location,
  uploadedModelConfigs: selectUploadedModelConfigs(state)
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  goToCart: navigationAction.goToCart
}

export default compose(
  scrollToTop(),
  withProps(({location}) => ({
    configIds: (location.state && location.state.configIds) || []
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      if (this.props.selectedModelConfigs.length === 0) {
        this.props.goToUpload()
      }
    }
  })
)(EditMaterialPage)
