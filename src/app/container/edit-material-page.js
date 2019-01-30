import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'

import * as navigationAction from '../action/navigation'

import backIcon from '../../asset/icon/back.svg'
import cartIcon from '../../asset/icon/cart.svg'
import helpIcon from '../../asset/icon/help.svg'

import {selectModelConfigsByIds, selectCartCount} from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'
import {openIntercom} from '../service/intercom'

import MaterialPartial from './material-partial'
import Modal from './modal'

import NavBar from '../component/nav-bar'
import Headline from '../component/headline'
import Section from '../component/section'
import ToolLayout from '../component/tool-layout'
import Logo from '../component/logo'
import IconLink from '../component/icon-link'
import Link from '../component/link'

const EditMaterialPage = ({goToCart, goToUpload, configIds, cartCount}) => {
  const sidebar = () => (
    <>
      <Section>
        <Link
          label="Back to cart"
          href="#"
          icon={backIcon}
          onClick={event => {
            event.preventDefault()
            goToCart()
          }}
        />
      </Section>
      <Section>
        <Headline modifiers={['xs']} label="Your selection" />
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
      <MaterialPartial isEditMode configIds={configIds} />
      <Modal />
    </ToolLayout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  currency: state.core.currency,
  location: state.core.location,
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
)(EditMaterialPage)
