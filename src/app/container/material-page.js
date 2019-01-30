import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'
import backIcon from '../../asset/icon/back.svg'

import * as navigationAction from '../action/navigation'

import {selectModelConfigsByIds, selectUploadedModelConfigs, selectCartCount} from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'
import {openIntercom} from '../service/intercom'

import MaterialPartial from './material-partial'
import Modal from './modal'

import ToolLayout from '../component/tool-layout'
import NavBar from '../component/nav-bar'
import Logo from '../component/logo'
import IconLink from '../component/icon-link'
import Link from '../component/link'
import Headline from '../component/headline'
import Section from '../component/section'

const MaterialPage = ({goToCart, goToUpload, cartCount, configIds, uploadedModelConfigs}) => {
  const sidebar = () => (
    <>
      <Section>
        <Link
          label="Back to upload"
          href="#"
          icon={backIcon}
          onClick={event => {
            event.preventDefault()
            goToUpload()
          }}
        />
      </Section>
      <Section>
        <Headline
          modifiers={['s']}
          label={`Your selection (${configIds.length}/${uploadedModelConfigs.length} files)`}
        />
      </Section>
    </>
  )

  return (
    <ToolLayout
      header={
        <NavBar
          leftContent={<Logo onClick={() => goToUpload()} />}
          rightContent={
            <>
              <IconLink
                icon={cartIcon}
                disabled={cartCount < 1}
                cartCount={cartCount}
                onClick={event => {
                  event.preventDefault()
                  goToCart()
                }}
              />
              <IconLink
                icon={helpIcon}
                onClick={event => {
                  event.preventDefault()
                  openIntercom()
                }}
              />
            </>
          }
        />
      }
      sidebar={sidebar()}
    >
      <MaterialPartial configIds={configIds} />
      <Modal />
    </ToolLayout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  currency: state.core.currency,
  location: state.core.location,
  uploadedModelConfigs: selectUploadedModelConfigs(state),
  cartCount: selectCartCount(state)
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
)(MaterialPage)
