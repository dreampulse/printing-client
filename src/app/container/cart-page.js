import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withProps from 'recompose/withProps'

import * as selector from '../lib/selector'
import {formatPrice, formatDimensions, formatTimeRange} from '../lib/formatter'
import {getProviderName} from '../lib/material'
import {PaymentAbortedError} from '../lib/error'
import {scrollToTop} from './util/scroll-to-top'
import {guard} from './util/guard'
import {getStateName, getCountryName} from '../service/country'
import {openIntercom, isIntercomBlocked} from '../service/intercom'
import * as printingEngine from '../lib/printing-engine'
import * as stripe from '../service/stripe'
import * as logging from '../service/logging'
import config from '../../../config'

import Link from '../component/link'
import SidebarLayout from '../component/sidebar-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Button from '../component/button'
import Paragraph from '../component/paragraph'
import PaymentSection from '../component/payment-section'
import CartModelItem from '../component/cart-model-item'
import ButtonBar from '../component/button-bar'
import LoadingIndicator from '../component/loading-indicator'
import PageLayout from '../component/page-layout'
import Container from '../component/container'
import NumberField from '../component/number-field'
import Grid from '../component/grid'
import Column from '../component/column'
import PaypalButton from '../component/paypal-button'
import PageHeader from '../component/page-header'
import Icon from '../component/icon'
import Notification from '../component/notification'
import ProviderName from '../component/provider-name'

import * as navigationAction from '../action/navigation'
import * as modelAction from '../action/model'
import * as modelViewerAction from '../action/model-viewer'
import * as quoteAction from '../action/quote'
import * as modalAction from '../action/modal'
import * as orderAction from '../action/order'
import * as coreAction from '../action/core'

import ModelListPartial from './model-list-partial'

import creditCardIcon from '../../asset/icon/credit-card.svg'
import deleteIcon from '../../asset/icon/delete.svg'
import copyIcon from '../../asset/icon/copy.svg'
import backIcon from '../../asset/icon/back.svg'
import zoomInIcon from '../../asset/icon/zoom-in.svg'
import shareIcon from '../../asset/icon/share.svg'

import useHasAdblocker from '../hook/use-has-adblocker'
import useBreakpoints from '../hook/use-breakpoints'

const CartPage = ({
  modelsWithConfig,
  modelConfigs,
  goToUpload,
  duplicateModelConfig,
  deleteModelConfigs,
  user,
  cart,
  cartShippings,
  openModelViewer,
  goToEditMaterial,
  liableForVat,
  updateQuantities,
  hasOnlyValidModelConfigsWithQuote,
  isCartUpToDate,
  featureFlags,
  openAddressFormModal,
  paymentInProgress,
  setPaymentInProgress,
  payWithPaypal,
  payWithStripe,
  payWithInvoice,
  onSuccess,
  openErrorModal,
  orderPaid,
  executePaypalPayment,
  createOffer,
  onGoToAddress
}) => {
  const hasAdblocker = useHasAdblocker()
  const breakpoints = useBreakpoints()
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0
  const hasItemsOnUploadPage = modelConfigs.length > modelsWithConfig.length

  const onEditAddress = scrollTo => {
    if (breakpoints['mobile-only']) {
      onGoToAddress(scrollTo)
    } else {
      openAddressFormModal(scrollTo)
    }
  }

  const renderNotificationSection = () => (
    <Section>
      <Notification
        message="It seems that you are using an ad blocker. Please temporarily disable this to pay using PayPal, or select a different payment method."
        type="warning"
      />
    </Section>
  )

  const renderButtonBar = (modelConfig, model) => (
    <ButtonBar l>
      <Button icon={zoomInIcon} iconOnly onClick={() => openModelViewer(model)} />
      <Button icon={copyIcon} iconOnly onClick={() => duplicateModelConfig(modelConfig.id)} />
      <Button icon={deleteIcon} iconOnly onClick={() => deleteModelConfigs([modelConfig.id])} />
      <Button
        label="Edit Material"
        tiny
        minor
        onClick={() => goToEditMaterial([modelConfig.id])}
        classNames={['u-hide-mobile', 'u-hide-tablet']}
      />
    </ButtonBar>
  )

  const renderAddressSection = () => {
    const shippingStateName =
      user && getStateName(user.shippingAddress.countryCode, user.shippingAddress.stateCode)

    const billingStateName =
      (user &&
        user.billingAddress &&
        user.billingAddress.stateCode &&
        getStateName(user.billingAddress.countryCode, user.billingAddress.stateCode)) ||
      (user &&
        user.shippingAddress.countryCode === user.billingAddress.countryCode &&
        shippingStateName) ||
      ''
    return (
      <Section>
        <Grid>
          <Column md={6}>
            <Headline
              minor
              size="l"
              label={
                <>
                  Delivery Address{' '}
                  <Link
                    label="edit"
                    onClick={() => onEditAddress()}
                    classNames={['u-font-size-base']}
                  />
                </>
              }
            />
            <Paragraph>
              {user.shippingAddress.firstName} {user.shippingAddress.lastName}
              <br />
              {user.shippingAddress.address}
              <br />
              {user.shippingAddress.addressLine2 && (
                <>
                  {user.shippingAddress.addressLine2}
                  <br />
                </>
              )}
              {user.shippingAddress.zipCode} {user.shippingAddress.city}
              <br />
              {shippingStateName && (
                <>
                  {shippingStateName}
                  <br />
                </>
              )}
              {getCountryName(user.shippingAddress.countryCode)}
            </Paragraph>
            <Paragraph classNames={['u-margin-bottom-l']}>
              Contact Email: {user.emailAddress}
              <br />
              Contact Phone: {user.phoneNumber}
            </Paragraph>
          </Column>
          <Column md={6}>
            {user && (
              <>
                <Headline
                  size="l"
                  minor
                  label={
                    <>
                      Billing Address{' '}
                      <Link
                        label="edit"
                        onClick={() => onEditAddress('billing-address')}
                        classNames={['u-font-size-base']}
                      />
                    </>
                  }
                />
                <Paragraph classNames={['u-margin-bottom-l']}>
                  {user.companyName ? (
                    <>
                      {user.companyName}
                      <br />
                    </>
                  ) : null}
                  {user.vatId ? (
                    <>
                      {user.vatId}
                      <br />
                    </>
                  ) : null}
                  {user.useDifferentBillingAddress ? (
                    <>
                      {user.billingAddress.firstName} {user.billingAddress.lastName}
                      <br />
                      {user.billingAddress.address}
                      <br />
                      {user.billingAddress.addressLine2 && (
                        <>
                          {user.billingAddress.addressLine2}
                          <br />
                        </>
                      )}
                      {user.billingAddress.zipCode} {user.billingAddress.city}
                      <br />
                    </>
                  ) : (
                    <>
                      {user.shippingAddress.firstName} {user.shippingAddress.lastName}
                      <br />
                      {user.shippingAddress.address}
                      <br />
                      {user.shippingAddress.addressLine2 && (
                        <>
                          {user.shippingAddress.addressLine2}
                          <br />
                        </>
                      )}
                      {user.shippingAddress.zipCode} {user.shippingAddress.city}
                      <br />
                    </>
                  )}
                  {billingStateName && (
                    <>
                      {billingStateName}
                      <br />
                    </>
                  )}
                  {user.billingAddress.countryCode
                    ? getCountryName(user.billingAddress.countryCode)
                    : getCountryName(user.shippingAddress.countryCode)}
                </Paragraph>
              </>
            )}
          </Column>
        </Grid>
      </Section>
    )
  }

  const renderModelListSection = () => (
    <Section>
      <ModelListPartial editMode onPrimaryActionClick={goToEditMaterial}>
        {modelsWithConfig.map(
          ({
            modelConfig,
            model,
            shipping,
            quote,
            materialName,
            finishGroupName,
            color,
            productionTimeFast,
            productionTimeSlow
          }) => (
            <CartModelItem
              key={modelConfig.id}
              id={modelConfig.id}
              imageSource={model.thumbnailUrl}
              title={model.fileName}
              price={formatPrice(quote.grossPrice, quote.currency)}
              info={
                <>
                  {formatDimensions(model.dimensions, model.fileUnit)}
                  <br />
                  {materialName}, {finishGroupName} ({color})
                </>
              }
              shippingInfo={
                <>
                  Est. delivery time:{' '}
                  <strong>
                    {formatTimeRange(
                      productionTimeFast + parseInt(shipping.deliveryTime, 10),
                      productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                    )}
                  </strong>
                  <br />
                  Delivery method: <strong>{shipping.name}</strong>
                </>
              }
              provider={<ProviderName vendorId={shipping.vendorId} />}
              buttonsLeft={
                <NumberField
                  value={modelConfig.quantity}
                  onChange={quantity => updateQuantities([modelConfig.id], quantity)}
                />
              }
              buttonsRight={renderButtonBar(modelConfig, model)}
              onPreviewImageClick={() => openModelViewer(model)}
            />
          )
        )}
      </ModelListPartial>
    </Section>
  )

  const renderAdditionalInformation = () => (
    <>
      {user ? (
        <Paragraph>
          <Headline
            tag="strong"
            size="s"
            label="Need different payment option?"
            classNames={['u-no-margin-bottom']}
          />
          <Link
            label="Contact us"
            href="mailto:support@all3dp.com"
            target="_blank"
            onClick={event => {
              if (!isIntercomBlocked()) {
                event.preventDefault()
                openIntercom()
              }
            }}
          />
        </Paragraph>
      ) : (
        <Paragraph>
          <Headline
            tag="strong"
            size="s"
            label="Payment options?"
            classNames={['u-no-margin-bottom']}
          />
          We support credit card and Paypal payments.
        </Paragraph>
      )}
      <Paragraph>
        <Headline
          tag="strong"
          size="s"
          label="Any questions?"
          classNames={['u-no-margin-bottom']}
        />
        <Link
          label="Get in touch"
          href="mailto:support@all3dp.com"
          target="_blank"
          onClick={event => {
            if (!isIntercomBlocked()) {
              event.preventDefault()
              openIntercom()
            }
          }}
        />
      </Paragraph>
      <Paragraph>
        <Link
          target="_blank"
          label="Terms of service"
          href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
        />
      </Paragraph>
    </>
  )

  const renderPaymentSection = () => {
    if (!cart) {
      return (
        <div className="u-align-center">
          <LoadingIndicator />
        </div>
      )
    }

    const showCart = isCartUpToDate && hasOnlyValidModelConfigsWithQuote
    const showVat = cart.vatPrice > 0 && liableForVat !== false
    const totalPrice = showVat ? cart.totalPrice : cart.totalNetPrice

    return (
      <>
        <PaymentSection
          classNames={['u-margin-bottom']}
          subtotal={formatPrice(showCart ? cart.subTotalPrice : null, cart.currency)}
          shippings={cartShippings.map(shipping => ({
            label: getProviderName(shipping.vendorId),
            price: formatPrice(showCart ? shipping.price : null, shipping.currency)
          }))}
          vat={showVat ? formatPrice(showCart ? cart.vatPrice : null, cart.currency) : ''}
          total={showCart ? formatPrice(totalPrice, cart.currency) : <LoadingIndicator />}
          childrenLabel={user ? 'Pay with:' : 'Proceed to:'}
        >
          {user ? (
            [
              <Button
                key="CREDIT_CARD"
                block
                disabled={!showCart || paymentInProgress}
                icon={creditCardIcon}
                label="Credit card"
                onClick={async () => {
                  try {
                    setPaymentInProgress(true)
                    await payWithStripe()
                    // leaving page after redirect to Stripe
                  } catch (error) {
                    logging.captureException(error)

                    if (error.type !== PaymentAbortedError.TYPE) {
                      openErrorModal(error)
                      openIntercom()
                    }
                    // Payment aborted by user
                    setPaymentInProgress(false)
                  }
                }}
              />,
              featureFlags.invoice && (
                <Button
                  key="INVOICE"
                  block
                  disabled={!showCart || paymentInProgress}
                  label="Pay with Invoice"
                  onClick={async () => {
                    try {
                      setPaymentInProgress(true)
                      const {orderNumber, paymentId} = await payWithInvoice()
                      await orderPaid({orderNumber, paymentId})
                      onSuccess()
                    } catch (error) {
                      logging.captureException(error)

                      setPaymentInProgress(false)
                      openErrorModal(error)
                    }
                  }}
                />
              ),
              <PaypalButton
                key="PAYPAL"
                disabled={!showCart || paymentInProgress}
                onClick={async () => {
                  setPaymentInProgress(true)
                  const {paymentToken, orderNumber, paymentId} = await payWithPaypal()
                  orderPaid({orderNumber, paymentId})
                  return paymentToken
                }}
                onAuthorize={async data => {
                  try {
                    const payment = await executePaypalPayment(data)
                    onSuccess()
                    return payment
                  } catch (error) {
                    logging.captureException(error)
                    return null
                  } finally {
                    setPaymentInProgress(false)
                  }
                }}
                onCancel={() => setPaymentInProgress(false)}
              />
            ]
          ) : (
            <Button label="Checkout" block onClick={() => onEditAddress()} />
          )}
        </PaymentSection>
        {breakpoints.tablet && renderAdditionalInformation()}
      </>
    )
  }

  return (
    <PageLayout>
      <Container full>
        {hasAdblocker && renderNotificationSection()}
        <Section>
          <Link
            label={
              hasItemsOnUploadPage ? (
                <>
                  For{' '}
                  <strong>
                    {modelConfigs.length - modelsWithConfig.length} of {modelConfigs.length}
                  </strong>{' '}
                  uploaded items you have not chosen a material
                </>
              ) : (
                'Back to upload'
              )
            }
            warning={hasItemsOnUploadPage}
            href="/"
            icon={<Icon source={backIcon} />}
            onClick={event => {
              event.preventDefault()
              goToUpload()
            }}
          />
        </Section>
      </Container>
      <Container>
        <PageHeader
          label="Review Order"
          action={
            <Link
              largeIcon
              icon={<Icon source={shareIcon} />}
              label={breakpoints.tablet ? 'Share Cart' : undefined}
              onClick={() => {
                createOffer(cart.cartId)
              }}
            />
          }
        />
        {hasModels && (
          <SidebarLayout sidebar={renderPaymentSection()}>
            {user && renderAddressSection()}
            <Headline minor size="l" label="Your Cart" />
            {renderModelListSection()}
            {!breakpoints.tablet && <Section>{renderAdditionalInformation()}</Section>}
          </SidebarLayout>
        )}
        {!hasModels && (
          <Paragraph size="l">
            Your cart is currently empty. Start by{' '}
            <Link
              href="/"
              onClick={event => {
                event.preventDefault()
                goToUpload()
              }}
              label="uploading your 3D model"
            />{' '}
            for printing.
          </Paragraph>
        )}
      </Container>
    </PageLayout>
  )
}

const mapStateToProps = state => ({
  user: state.core.user,
  modelsWithConfig: selector.selectConfiguredModelInformation(state),
  modelConfigs: state.core.modelConfigs,
  cartShippings: selector.selectCartShippings(state),
  currency: state.core.currency,
  location: state.core.location,
  cart: state.core.cart,
  liableForVat: state.core.user && state.core.user.liableForVat,
  featureFlags: state.core.featureFlags,
  hasOnlyValidModelConfigsWithQuote: selector.hasOnlyValidModelConfigsWithQuote(state),
  pollingProgress: selector.selectQuotePollingProgress(state),
  isCartUpToDate: selector.isCartUpToDate(state),
  urlParams: state.core.urlParams,
  orderNumber: state.core.orderNumber,
  quotePollingId: state.core.quotePollingId
})

const mapDispatchToProps = dispatch => ({
  openAddressFormModal: bindActionCreators(modalAction.openAddressFormModal, dispatch),
  openErrorModal: bindActionCreators(modalAction.openErrorModal, dispatch),
  goToUpload: bindActionCreators(navigationAction.goToUpload, dispatch),
  deleteModelConfigs: bindActionCreators(modelAction.deleteModelConfigs, dispatch),
  goToEditMaterial: bindActionCreators(navigationAction.goToEditMaterial, dispatch),
  goToSuccess: bindActionCreators(navigationAction.goToSuccess, dispatch),
  openModelViewer: bindActionCreators(modelViewerAction.open, dispatch),
  updateQuantities: bindActionCreators(modelAction.updateQuantities, dispatch),
  goingToReceiveQuotes: bindActionCreators(quoteAction.goingToReceiveQuotes, dispatch),
  receiveQuotes: bindActionCreators(quoteAction.receiveQuotes, dispatch),
  orderPaid: bindActionCreators(orderAction.paid, dispatch),
  executePaypalPayment: bindActionCreators(orderAction.executePaypalPayment, dispatch),
  restoreUser: bindActionCreators(coreAction.restoreUser, dispatch),
  openShareCartModal: bindActionCreators(modalAction.openShareCartModal, dispatch),
  fatalError: bindActionCreators(coreAction.fatalError, dispatch),
  duplicateModelConfig: id => {
    const action = modelAction.duplicateModelConfig(id)
    return dispatch(action).then(() => {
      dispatch(navigationAction.goToMaterial([action.payload.nextId]))
    })
  },
  onGoToAddress: bindActionCreators(navigationAction.goToAddress, dispatch)
})

export default compose(
  scrollToTop(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  guard(props => props.modelsWithConfig.length > 0),
  withProps(props => ({
    utmParams: {
      source: props.urlParams.utm_source,
      medium: props.urlParams.utm_medium,
      campaign: props.urlParams.utm_campaign,
      term: props.urlParams.utm_term,
      content: props.urlParams.utm_content
    }
  })),
  withState('paymentInProgress', 'setPaymentInProgress', false),
  withPropsOnChange(
    () => false, // Should never reinitialize the debounce function
    ({receiveQuotes}) => ({
      debouncedReceiveQuotes: debounce(receiveQuotes, config.receiveQuotesWait)
    })
  ),
  withHandlers({
    onSuccess: props => () => props.goToSuccess(props.orderNumber),
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
      const {utmParams, user, cart} = props
      const {userId} = user
      const {cartId, currency} = cart

      const {orderId} = await printingEngine.createOrder({
        userId,
        cartId,
        currency,
        utmParams
      })

      const {sessionId} = await printingEngine.createStripePayment({orderId})

      await stripe.redirectToCheckout({sessionId})
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
    },
    createOffer: ({fatalError, openShareCartModal}) => cartId => {
      printingEngine
        .createOffer({cartId})
        .then(({offerId}) => {
          openShareCartModal(offerId)
        })
        .catch(fatalError)
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.restoreUser()

      // Refresh quotes if cart is invalid
      if (!this.props.hasOnlyValidModelConfigsWithQuote) {
        const modelConfigs = this.props.modelConfigs
        const {refresh} = this.props.featureFlags
        const currency = this.props.currency
        const {countryCode} = this.props.location

        this.props.receiveQuotes({
          modelConfigs,
          countryCode,
          currency,
          refresh
        })
      }
    },
    componentDidUpdate(prevProps) {
      if (prevProps.modelsWithConfig.length > 0 && this.props.modelsWithConfig.length === 0) {
        this.props.goToUpload()
      }

      if (
        !this.props.hasOnlyValidModelConfigsWithQuote &&
        (prevProps.modelConfigs !== this.props.modelConfigs ||
          prevProps.countryCode !== this.props.countryCode ||
          prevProps.currency !== this.props.currency)
      ) {
        const modelConfigs = this.props.modelConfigs
        const {refresh} = this.props.featureFlags
        const currency = this.props.currency
        const {countryCode} = this.props.location

        this.props.goingToReceiveQuotes()
        this.props.debouncedReceiveQuotes({
          modelConfigs,
          countryCode,
          currency,
          refresh
        })
      }
    }
  })
)(CartPage)
