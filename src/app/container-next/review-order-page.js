import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import compact from 'lodash/compact'
import {connect} from 'react-redux'

import * as printingEngine from '../lib/printing-engine'
import * as stripe from '../service/stripe'

import {getStateName, getCountryName} from '../service/country'
import {openIntercom} from '../service/intercom'
import {formatPrice, formatDimensions, formatDeliveryTime} from '../lib/formatter'
import {getProviderName} from '../lib/material'
import {selectUniqueChosenShippings, selectConfiguredModelInformation} from '../lib/selector'
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

import * as navigationActions from '../action-next/navigation'
import * as modelViewerActions from '../action-next/model-viewer'
import * as orderActions from '../action-next/order'

import creditCardIcon from '../../asset/icon/credit-card.svg'

import {guard} from './util/guard'
import CheckoutLayout from './checkout-layout'
import PaypalButton from '../component/paypal-button'

const ReviewOrderPage = ({
  user,
  onGoToAddress,
  onGoToCart,
  onGoToSuccess,
  onPaid,
  cart,
  modelsWithConfig,
  chosenShippings,
  onMagnifyModel,
  onExecutePaypalPayment,
  paymentInProgress,
  setPaymentInProgress,
  featureFlags,
  payWithPaypal,
  payWithStripe,
  payWithInvoice
}) => {
  const shippingStateName = getStateName(
    user.shippingAddress.countryCode,
    user.shippingAddress.stateCode
  )
  const billingStateName =
    (user.billingAddress &&
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
            <EditLink label="edit" onClick={() => onGoToAddress()} />
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
            <EditLink label="edit" onClick={onGoToAddress} />
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
          onPaid({orderNumber, paymentId})
          setPaymentInProgress(false)
          onGoToSuccess()
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
            onPaid({orderNumber, paymentId})
            onGoToSuccess()
          } catch (error) {
            // Payment aborted by user
            setPaymentInProgress(false)
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
        onPaid({orderNumber, paymentId})
        return paymentToken
      }}
      onAuthorize={async data => {
        try {
          const payment = await onExecutePaypalPayment(data)

          onGoToSuccess()
          return payment
        } finally {
          setPaymentInProgress(false)
        }
      }}
      onCancel={() => setPaymentInProgress(false)}
    />
  ])

  const renderPaymentSection = () => (
    <React.Fragment>
      <PaymentSection
        classNames={['u-margin-bottom']}
        subtotal={formatPrice(cart.subTotalPrice, cart.currency)}
        shippings={chosenShippings.map(shipping => ({
          label: getProviderName(shipping.vendorId),
          price: formatPrice(shipping.price, shipping.currency)
        }))}
        vat={formatPrice(cart.vatPrice, cart.currency)}
        total={formatPrice(cart.totalPrice, cart.currency)}
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
          href="mailto:contact@all3dp.com"
          onClick={event => {
            openIntercom()
            event.preventDefault()
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
          href="mailto:contact@all3dp.com"
          onClick={event => {
            openIntercom()
            event.preventDefault()
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
    </React.Fragment>
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
            <React.Fragment key="label">
              Your Order <EditLink label="edit" onClick={() => onGoToCart()} />
            </React.Fragment>
          }
        />
        <CheckoutModelList>
          {modelsWithConfig.map(
            ({
              modelConfig,
              model,
              shipping,
              quote,
              process,
              providerInfo,
              materialConfigId,
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
                price={formatPrice(user.isCompany ? quote.price : quote.grossPrice, quote.currency)}
                deliveryTime={formatDeliveryTime(shipping.deliveryTime)}
                shippingMethod={shipping.name}
                providerId={shipping.vendorId}
                materialName={process}
                providerMaterialName={providerInfo}
                onMagnify={() => onMagnifyModel(model)}
                color={
                  <SelectField
                    modifiers={['compact']}
                    value={{
                      value: materialConfigId,
                      colorValue: colorCode,
                      label: color,
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
  shippings: state.core.shippings,
  modelConfigs: state.core.modelConfigs,
  modelsWithConfig: selectConfiguredModelInformation(state),
  chosenShippings: selectUniqueChosenShippings(state),
  featureFlags: state.core.featureFlags
})

const mapDispatchToProps = {
  onGoToAddress: navigationActions.goToAddress,
  onGoToCart: navigationActions.goToCart,
  onGoToSuccess: navigationActions.goToSuccess,
  onMagnifyModel: modelViewerActions.open,
  onPaid: orderActions.paid,
  onExecutePaypalPayment: orderActions.executePaypalPayment
}

const enhance = compose(
  guard(state => state.core.cart),
  connect(mapStateToProps, mapDispatchToProps),
  withState('paymentInProgress', 'setPaymentInProgress', false),
  withHandlers({
    payWithPaypal: props => async () => {
      const userId = props.user.userId
      const cartId = props.cart.cartId
      const currency = props.cart.currency

      const {orderId, orderNumber} = await printingEngine.createOrder({userId, cartId, currency})
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
      const price = props.cart.totalPrice
      const currency = props.cart.currency

      const {orderId, orderNumber} = await printingEngine.createOrder({userId, cartId, currency})
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
      const invoiceKey = 'TODO' // Issue #716

      const {orderId, orderNumber} = await printingEngine.createOrder({userId, cartId, currency})
      await printingEngine.createInvoicePayment({orderId, token: invoiceKey})

      return {
        orderId,
        orderNumber
      }
    }
  })
)

export default enhance(ReviewOrderPage)
