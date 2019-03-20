import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'

import AppLayout from './app-layout'
import {scrollToTop} from './util/scroll-to-top'
import {getOrderStatus} from '../lib/printing-engine'

import {removeBootsplash} from '../service/bootsplash'

import Section from '../component/section'
import Headline from '../component/headline'
import PageHeader from '../component/page-header'

const OrderStatusPage = ({orderStatusError, orderStatus}) => (
  <AppLayout>
    <PageHeader label="Thank you for ordering with Craftcloud by All3DP!" />
    <Section modifiers={['highlight']}>
      <Headline label="Headline" />
      <code>
        <pre>{JSON.stringify(orderStatus, '', 2)}</pre>
      </code>
    </Section>
  </AppLayout>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

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
          this.props.setOrderStatus(orderStatus)
          removeBootsplash()
        })
        .catch(error => {
          this.props.setError(error)
        })
    }
  })
)

export default enhance(OrderStatusPage)
