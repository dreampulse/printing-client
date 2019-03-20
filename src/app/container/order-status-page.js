import React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'

import AppLayout from './app-layout'
import {scrollToTop} from './util/scroll-to-top'
import {getOrderStatus} from '../lib/printing-engine'

import Section from '../component/section'
import Headline from '../component/headline'
import PageHeader from '../component/page-header'
import Paragraph from '../component/paragraph'
import Link from '../component/link'

const OrderStatusPage = ({location, orderStatusError, orderStatus}) => {
  if (!location.state || !location.state.orderNumber) {
    return <Redirect to="/" />
  }
  return (
    <AppLayout>
      <PageHeader label="Thank you for ordering with Craftcloud by All3DP!" />
      <Section modifiers={['highlight']}>
        <Headline label="Headline" />
        <Paragraph modifiers={['l']}>
          You should shortly receive an email confirming your order.
        </Paragraph>
        <Paragraph modifiers={['l']}>
          Please note that your order will be produced and sent from:
        </Paragraph>

        <Headline label="What happens now?" />
        <Paragraph modifiers={['l']}>
          Your order is going through manual checks for printability at the manufacturer. At this
          first step they make sure that small details and necessary parts are printable. Thereafter
          the order is pushed to production, finishing and finally to quality control before being
          shipped out. We will send you an update on your order when we have received the tracking
          number from the manufacturer.
        </Paragraph>
        <Headline label="Questions regarding your order?" />
        <Paragraph modifiers={['l']}>
          Email us at <Link href="mailto:support@all3dp.com" label="support@all3dp.com" />
        </Paragraph>
      </Section>
    </AppLayout>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

const enhance = compose(
  scrollToTop(),
  withState('orderStatusError', 'setOrderStatusError', true),
  withState('orderStatus', 'setOrderStatus', true),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      getOrderStatus(this.props.match.params.id)
        .then(orderStatus => {
          this.props.setOrderStatus(orderStatus)
        })
        .catch(error => {
          this.props.setError(error)
        })
    }
  })
)

export default enhance(OrderStatusPage)
