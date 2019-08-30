import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import compose from 'recompose/compose'

import {scrollToTop} from './util/scroll-to-top'
import {goToCart} from '../action/navigation'
import useBreakpoints from '../hook/use-breakpoints'

import PageLayout from '../component/page-layout'
import Container from '../component/container'
import Section from '../component/section'
import Headline from '../component/headline'

import AddressFormPartial from './address-form-partial'
import Paragraph from '../component/paragraph'

const addressFormPageScrollContainerSelector = 'html'

const AddressPage = ({onGoToCart, location}) => {
  const breakpoints = useBreakpoints()

  if (breakpoints.tablet) {
    return <Redirect to="/cart" />
  }

  return (
    <AddressFormPartial
      scrollContainerSelector={addressFormPageScrollContainerSelector}
      scrollTo={(location.state || {}).scrollTo}
      onSubmitted={() => onGoToCart()}
      onCancel={() => onGoToCart()}
    >
      {({submitButton, addressForm, cancelButton}) => (
        <PageLayout>
          <Container s>
            <Headline label="Enter delivery address" size="l" />
            <Section>{addressForm}</Section>
            <Section>
              <Paragraph>{submitButton}</Paragraph>
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
