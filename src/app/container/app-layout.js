import React from 'react'
import {connect} from 'react-redux'

import {selectCartCount} from '../lib/selector'

import {goToUpload, goToCart} from '../action/navigation'
import Modal from './modal'

import PageLayout from '../component/page-layout'
import Container from '../component/container'

import NavBarPartial from './nav-bar-partial'

const AppLayout = ({children, footer}) => (
  <PageLayout header={<NavBarPartial />} footer={footer}>
    <Container>{children}</Container>
    <Modal />
  </PageLayout>
)

const mapStateToProps = state => ({
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  onHomeClick: goToUpload,
  onUploadClick: goToUpload,
  onCartClick: goToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout)
