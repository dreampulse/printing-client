// @flow

import React, {Fragment} from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'
import compact from 'lodash/compact'
import {connect} from 'react-redux'

import * as printingEngine from '../lib/printing-engine'
import * as stripe from '../service/stripe'

import {getStateName, getCountryName} from '../service/country'
import {openIntercom} from '../service/intercom'
import {formatPrice, formatDimensions, formatDeliveryTime} from '../lib/formatter'
import {getProviderName} from '../lib/material'
import {selectCartShippings, selectConfiguredModelInformation} from '../lib/selector'
import getCloudinaryUrl from '../lib/cloudinary'

import PageHeader from '../component/page-header'
import SidebarLayout from '../component/sidebar-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Button from '../component/button'
import EditLink from '../component/edit-link'
import Link from '../component/link'
import Grid from '../component/grid'
import Column from '../component/column'
import Paragraph from '../component/paragraph'
import PaymentSection from '../component/payment-section'
import CheckoutModelList from '../component/checkout-model-list'
import ModelItem from '../component/model-item'
import SelectField from '../component/select-field'

import * as navigationActions from '../action/navigation'
import * as modelViewerActions from '../action/model-viewer'
import * as orderActions from '../action/order'
import * as coreActions from '../action/core'

import creditCardIcon from '../../asset/icon/credit-card.svg'

import {guard} from './util/guard'
import {scrollToTop} from './util/scroll-to-top'
import CheckoutLayout from './checkout-layout'
import PaypalButton from '../component/paypal-button'

const ReviewOrderPage = ({
  user,
  goToAddress,
  goToCart,
  orderPaid,
  cart,
  modelsWithConfig,
  cartShippings,
  openModelViewer,
  executePaypalPayment,
  paymentInProgress,
  setPaymentInProgress,
  featureFlags,
  payWithPaypal,
  payWithStripe,
  payWithInvoice,
  fatalError,
  success,
  liableForVat
}) => {
  const shippingStateName =
    user && getStateName(user.shippingAddress.countryCode, user.shippingAddress.stateCode)

  const billingStateName =
    (user &&
      user.billingAddress &&
      user.billingAddress.stateCode &&
      getStateName(user.shippingAddress.countryCode, user.billingAddress.stateCode)) ||
    shippingStateName

  const renderAddressSection = () => (
    <Section>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Shipping Address" />
          <Paragraph modifiers={['l']}>
            {user.companyName ? (
              <span>
                {user.companyName}
                <br />
              </span>
            ) : null}
            {user.vatId ? (
              <span>
                {user.vatId}
                <br />
              </span>
            ) : null}
            {user.shippingAddress.firstName} {user.shippingAddress.lastName}
            <br />
            {user.shippingAddress.address}
            <br />
            {user.shippingAddress.addressLine2}
            <br />
            {user.shippingAddress.zipCode} {user.shippingAddress.city}
            <br />
            {shippingStateName && (
              <span>
                {shippingStateName}
                <br />
              </span>
            )}
            {getCountryName(user.shippingAddress.countryCode)}
            <br />
            <EditLink label="edit" onClick={() => goToAddress('shipping-address')} />
          </Paragraph>
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Billing Address" />
          <Paragraph modifiers={['l']}>
            {user.companyName ? (
              <span>
                {user.companyName}
                <br />
              </span>
            ) : null}
            {user.vatId ? (
              <span>
                {user.vatId}
                <br />
              </span>
            ) : null}
            {user.billingAddress.firstName || user.shippingAddress.firstName}{' '}
            {user.billingAddress.lastName || user.shippingAddress.lastName}
            <br />
            {user.billingAddress.address || user.shippingAddress.address}
            <br />
            {user.billingAddress.addressLine2 || user.shippingAddress.addressLine2}
            <br />
            {user.billingAddress.zipCode || user.shippingAddress.zipCode}{' '}
            {user.billingAddress.city || user.shippingAddress.city}
            <br />
            {billingStateName && (
              <span>
                {billingStateName}
                <br />
              </span>
            )}
            {user.billingAddress.countryCode
              ? getCountryName(user.billingAddress.countryCode)
              : getCountryName(user.shippingAddress.countryCode)}
            <br />
            {user.useDifferentBillingAddress && (
              <EditLink label="edit" onClick={() => goToAddress('billing-address')} />
            )}
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const paymentButtons = compact([
    <Button
      key="payment-stripe"
      modifiers={['block']}
      disabled={paymentInProgress}
      icon={creditCardIcon}
      label="Credit card"
      onClick={async () => {
        try {
          setPaymentInProgress(true)
          const {orderNumber, paymentId} = await payWithStripe()
          await orderPaid({orderNumber, paymentId})
          setPaymentInProgress(false)
          success()
        } catch (error) {
          // Payment aborted by user
          setPaymentInProgress(false)
        }
      }}
    />,
    featureFlags.invoice && (
      <Button
        key="payment-invoice"
        modifiers={['block']}
        disabled={paymentInProgress}
        label="Pay with Invoice"
        onClick={async () => {
          try {
            setPaymentInProgress(true)
            const {orderNumber, paymentId} = await payWithInvoice()
            await orderPaid({orderNumber, paymentId})
            success()
          } catch (error) {
            setPaymentInProgress(false)
            fatalError(error)
          }
        }}
      />
    ),
    <PaypalButton
      key="payment-paypal"
      disabled={paymentInProgress}
      onClick={async () => {
        setPaymentInProgress(true)
        const {paymentToken, orderNumber, paymentId} = await payWithPaypal()
        orderPaid({orderNumber, paymentId})
        return paymentToken
      }}
      onAuthorize={async data => {
        try {
          const payment = await executePaypalPayment(data)
          success()
          return payment
        } finally {
          setPaymentInProgress(false)
        }
      }}
      onCancel={() => setPaymentInProgress(false)}
    />
  ])

  const renderPaymentSection = () => (
    <Fragment>
      <PaymentSection
        classNames={['u-margin-bottom']}
        subtotal={formatPrice(cart.subTotalPrice, cart.currency)}
        shippings={cartShippings.map(shipping => ({
          label: getProviderName(shipping.vendorId),
          price: formatPrice(shipping.price, shipping.currency)
        }))}
        vat={liableForVat && formatPrice(cart.vatPrice, cart.currency)}
        total={formatPrice(liableForVat ? cart.totalPrice : cart.totalNetPrice, cart.currency)}
        childrenLabel="Pay with:"
      >
        {paymentButtons}
      </PaymentSection>
      <Paragraph>
        <Headline
          tag="strong"
          modifiers={['xs']}
          label="Need different payment option?"
          classNames={['u-no-margin-bottom']}
        />
        <Link
          label="Contact us."
          href="#"
          onClick={event => {
            event.preventDefault()
            openIntercom()
          }}
        />
      </Paragraph>
      <Paragraph>
        <Headline
          tag="strong"
          modifiers={['xs']}
          label="Any questions?"
          classNames={['u-no-margin-bottom']}
        />
        <Link
          label="Get in touch"
          href="#"
          onClick={event => {
            event.preventDefault()
            openIntercom()
          }}
        />
        {' or '}
        <Link label="search our knowledge base." href="https://help.all3dp.com" target="_blank" />
      </Paragraph>
      <Paragraph>
        <Link
          target="_blank"
          label="Terms of service"
          href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
        />
      </Paragraph>
    </Fragment>
  )

  return (
    <CheckoutLayout title="Checkout" currentStep={1}>
      <PageHeader label="Review Order" />
      <SidebarLayout sidebar={renderPaymentSection()}>
        {renderAddressSection()}
        <Headline
          tag="strong"
          modifiers={['minor', 'l', 'inline']}
          label={
            <Fragment key="label">
              Your Order <EditLink label="edit" onClick={() => goToCart()} />
            </Fragment>
          }
        />
        <CheckoutModelList>
          {modelsWithConfig.map(
            ({
              modelConfig,
              model,
              shipping,
              quote,
              materialName,
              providerInfo,
              materialConfigId,
              finishGroupName,
              colorCode,
              color,
              colorImage
            }) => (
              <ModelItem
                modifiers={['read-only']}
                key={modelConfig.id}
                id={modelConfig.id}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
                quantity={modelConfig.quantity}
                price={formatPrice(quote.price, quote.currency)}
                deliveryTime={formatDeliveryTime(shipping.deliveryTime)}
                shippingMethod={shipping.name}
                providerId={shipping.vendorId}
                materialName={materialName}
                providerMaterialName={providerInfo}
                onMagnify={() => openModelViewer(model)}
                color={
                  <SelectField
                    modifiers={['compact']}
                    value={{
                      value: materialConfigId,
                      colorValue: colorCode,
                      label: `${color}, ${finishGroupName}`,
                      colorImage:
                        colorImage && getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill'])
                    }}
                  />
                }
              />
            )
          )}
        </CheckoutModelList>
      </SidebarLayout>
    </CheckoutLayout>
  )
}

const mapStateToProps = state => ({
  user: state.core.user,
  cart: state.core.cart,
  orderNumber: state.core.orderNumber,
  shippings: state.core.shippings,
  modelConfigs: state.core.modelConfigs,
  modelsWithConfig: selectConfiguredModelInformation(state),
  cartShippings: selectCartShippings(state),
  featureFlags: state.core.featureFlags,
  urlParams: state.core.urlParams,
  liableForVat: state.core.user && state.core.user.liableForVat
})

const mapDispatchToProps = {
  goToAddress: navigationActions.goToAddress,
  goToCart: navigationActions.goToCart,
  goToSuccess: navigationActions.goToSuccess,
  openModelViewer: modelViewerActions.open,
  orderPaid: orderActions.paid,
  executePaypalPayment: orderActions.executePaypalPayment,
  fatalError: coreActions.fatalError
}

const enhance = compose(
  scrollToTop(),
  guard(state => state.core.cart),
  connect(mapStateToProps, mapDispatchToProps),
  withState('paymentInProgress', 'setPaymentInProgress', false),
  withProps(props => ({
    utmParams: {
      source: props.urlParams.utm_source,
      medium: props.urlParams.utm_medium,
      campaign: props.urlParams.utm_campaign,
      term: props.urlParams.utm_term,
      content: props.urlParams.utm_content
    }
  })),
  withHandlers({
    success: props => () =>
      props.goToSuccess({
        orderNumber: props.orderNumber,
        vendorIds: props.modelsWithConfig.map(info => info.quote.vendorId)
      }),
    payWithPaypal: props => async () => {
      const userId = props.user.userId
      const cartId = props.cart.cartId
      const currency = props.cart.currency
      const utmParams = props.utmParams

      const {orderId, orderNumber} = await printingEngine.createOrder({
        userId,
        cartId,
        currency,
        utmParams
      })
      const {paymentId, providerFields} = await printingEngine.createPaypalPayment({orderId})

      return {
        orderId,
        orderNumber,
        paymentId,
        paymentToken: providerFields.paymentId
      }
    },
    payWithStripe: props => async () => {
      const userId = props.user.userId
      const cartId = props.cart.cartId
      const email = props.user.emailAddress
      const price = props.liableForVat ? props.cart.totalPrice : props.cart.totalNetPrice
      const currency = props.cart.currency
      const utmParams = props.utmParams

      const {orderId, orderNumber} = await printingEngine.createOrder({
        userId,
        cartId,
        currency,
        utmParams
      })
      const stripeTokenObject = await stripe.checkout({price, currency, email})
      const token = stripeTokenObject.id

      await printingEngine.createStripePayment({orderId, token})

      return {
        orderId,
        orderNumber
      }
    },
    payWithInvoice: props => async () => {
      const userId = props.user.userId
      const cartId = props.cart.cartId
      const currency = props.cart.currency
      const utmParams = props.utmParams
      const invoiceKey = props.urlParams.invoice_key

      const {orderId, orderNumber} = await printingEngine.createOrder({
        userId,
        cartId,
        currency,
        utmParams
      })
      await printingEngine.createInvoicePayment({orderId, token: invoiceKey})

      return {
        orderId,
        orderNumber
      }
    }
  })
)

export default enhance(ReviewOrderPage)
