import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'

import * as navigationAction from '../action/navigation'

import {selectModelConfigsByIds, selectUploadedModelConfigs} from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'

import FooterPartial from './footer-partial'
import ConfigurationHeaderPartial from './configuration-header-partial'
import MaterialPartial from './material-partial'

import PageLayout from '../component/page-layout'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import CloseButton from '../component/close-button'
import Headline from '../component/headline'
import Section from '../component/section'

const EditMaterialPage = ({goToCart, configIds, uploadedModelConfigs}) => {
  const title = `Edit material (${configIds.length} of ${uploadedModelConfigs.length} items)`

  return (
    <PageLayout
      header={[
        <NavBar
          key="header-bar"
          leftContent={
            <>
              <CloseButton
                modifiers={['l', 'minor']}
                onClick={() => goToCart({selectModelConfigIds: configIds})}
              />
              <Headline modifiers={['l', 'minor']} label={title} />
            </>
          }
        />
      ]}
      footer={<FooterPartial />}
    >
      <Section>
        <Container>
          <ConfigurationHeaderPartial key="configuration-header" />
        </Container>
      </Section>
      <Container>
        <MaterialPartial configIds={configIds} />
      </Container>
    </PageLayout>
  )
}

const mapStateToProps = (state, ownProps) => ({
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
