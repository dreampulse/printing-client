// const addressFormModalScrollContainerId = 'addressFormModalScrollContainer'

import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'

import {scrollToTop} from './util/scroll-to-top'
import {goToCart} from '../action/navigation'

import PageLayout from '../component/page-layout'
import Container from '../component/container'
import Section from '../component/section'
import Headline from '../component/headline'

import AddressFormPartial from './address-form-partial'

const AddressPage = ({onGoToCart}) => {
  return (
    <AddressFormPartial onSubmitted={() => onGoToCart()} onCancel={() => onGoToCart()}>
      {({submitButton, addressForm, cancelButton}) => (
        <PageLayout>
          <Container s>
            <Headline label="Enter delivery address" size="l" />
            <Section>{addressForm}</Section>
            <Section>
              <div className="u-margin-bottom">{submitButton}</div>
              {cancelButton}
            </Section>
          </Container>
        </PageLayout>
      )}
    </AddressFormPartial>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onGoToCart: goToCart
}

const enhance = compose(
  scrollToTop(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(AddressPage)
