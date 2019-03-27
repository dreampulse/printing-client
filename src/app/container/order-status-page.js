import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'

import {scrollToTop} from './util/scroll-to-top'
import {getOrderStatus} from '../lib/printing-engine'
import {openIntercom} from '../service/intercom'
import {removeBootsplash} from '../service/bootsplash'
import {goToUpload} from '../action/navigation'

import helpIcon from '../../asset/icon/help.svg'

import FooterPartial from './footer-partial'

import LoadingContainer from '../component/loading-container'
import Container from '../component/container'
import PageLayout from '../component/page-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'
import Button from '../component/button'
import NavBar from '../component/nav-bar'
import Logo from '../component/logo'
import IconLink from '../component/icon-link'

const OrderStatusPage = ({orderStatusError, orderStatus, onHomeClick}) => (
  <PageLayout
    header={
      <NavBar
        leftContent={<Logo onClick={() => onHomeClick()} />}
        rightContent={
          <IconLink
            icon={helpIcon}
            onClick={event => {
              event.preventDefault()
              openIntercom()
            }}
          />
        }
      />
    }
    footer={<FooterPartial />}
  >
    {!orderStatusError && !orderStatus ? (
      <LoadingContainer insideContent />
    ) : (
      <Container>
        {orderStatus && !orderStatus.cancelled && (
          <Section classNames={['u-align-center']}>
            <Headline modifiers={['xl']} label="Where is my order?" />
            <Paragraph>
              <strong>Your order number:</strong> {orderStatus.orderNumber}
            </Paragraph>
          </Section>
        )}
        {orderStatus && orderStatus.cancelled && (
          <Section classNames={['u-align-center']}>
            <Headline modifiers={['xl']} label="Your order got cancelled!" />
            <Paragraph>
              <strong>Your order number:</strong> {orderStatus.orderNumber}
            </Paragraph>
            <Paragraph>Your order got cancelled for some reason we don&apos;t know.</Paragraph>
          </Section>
        )}
        {orderStatusError && (
          <Section classNames={['u-align-center']}>
            <Headline modifiers={['xl']} label="Order not found!" />
            <Paragraph>
              Sorry! We can&apos;t find your order.
              <br />
              Please contact support or check the link in your email.
            </Paragraph>
          </Section>
        )}
        <Section classNames={['u-align-center']}>
          <Headline modifiers={['l']} label="Any Questions?" />
          <Paragraph classNames={['u-margin-bottom-xl']}>
            <strong>Contact us</strong> if you have any questions.
          </Paragraph>
          <Button minor label="Contact Us" onClick={() => openIntercom()} />
        </Section>
      </Container>
    )}
  </PageLayout>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onHomeClick: goToUpload
}

const enhance = compose(
  scrollToTop(),
  withState('orderStatusError', 'setOrderStatusError', null),
  withState('orderStatus', 'setOrderStatus', null),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      getOrderStatus(this.props.match.params.id)
        .then(orderStatus => {
          console.log('-- orderStatus', orderStatus)
          this.props.setOrderStatus(orderStatus)
          removeBootsplash()
        })
        .catch(error => {
          this.props.setOrderStatusError(error)
          removeBootsplash()
        })
    }
  })
)

export default enhance(OrderStatusPage)
