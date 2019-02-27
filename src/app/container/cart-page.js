import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'

import * as selector from '../lib/selector'
import {formatPrice, formatDimensions, formatDeliveryTime} from '../lib/formatter'
import {getProviderName} from '../lib/material'
import getCloudinaryUrl from '../lib/cloudinary'
import {scrollToTop} from './util/scroll-to-top'
import {guard} from './util/guard'

import Link from '../component/link'
import SidebarLayout from '../component/sidebar-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Button from '../component/button'
import Paragraph from '../component/paragraph'
import PaymentSection from '../component/payment-section'
import SelectField from '../component/select-field'
import ModelItem from '../component/model-item'
import ButtonBar from '../component/button-bar'
import LoadingIndicator from '../component/loading-indicator'
import Notification from '../component/notification'
import PageLayout from '../component/page-layout'
import Container from '../component/container'
import NumberField from '../component/number-field'

import * as navigationAction from '../action/navigation'
import * as modelAction from '../action/model'
import * as modelViewerAction from '../action/model-viewer'
import * as quoteAction from '../action/quote'

import ModelListPartial from './model-list-partial'
import NavBarPartial from './nav-bar-partial'

import deleteIcon from '../../asset/icon/delete.svg'
import copyIcon from '../../asset/icon/copy.svg'
import editIcon from '../../asset/icon/edit.svg'

const CartPage = ({
  modelsWithConfig,
  modelConfigs,
  goToUpload,
  goToReviewOrder,
  duplicateModelConfig,
  deleteModelConfigs,
  cart,
  cartShippings,
  openModelViewer,
  goToEditMaterial,
  numAddedItems,
  liableForVat,
  updateQuantities,
  hasOnlyValidModelConfigsWithQuote,
  isCartUpToDate
}) => {
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0

  const buttonBar = modelConfig => (
    <ButtonBar>
      <NumberField
        value={modelConfig.quantity}
        onChange={quantity => updateQuantities([modelConfig.id], quantity)}
      />
      <Button icon={editIcon} iconOnly onClick={() => goToEditMaterial([modelConfig.id])} />
      <Button icon={copyIcon} iconOnly onClick={() => duplicateModelConfig(modelConfig.id)} />
      <Button icon={deleteIcon} iconOnly onClick={() => deleteModelConfigs([modelConfig.id])} />
    </ButtonBar>
  )

  const modelListSection = () => (
    <Section>
      <ModelListPartial editMode onPrimaryActionClick={goToEditMaterial}>
        {modelsWithConfig.map(
          ({
            modelConfig,
            model,
            shipping,
            quote,
            materialName,
            materialConfigId,
            finishGroupName,
            colorCode,
            color,
            colorImage
          }) => (
            <ModelItem
              key={modelConfig.id}
              id={modelConfig.id}
              quantity={modelConfig.quantity}
              imageSource={model.thumbnailUrl}
              title={model.fileName}
              subline={formatDimensions(model.dimensions, model.fileUnit)}
              buttonBar={buttonBar(modelConfig)}
              price={formatPrice(
                quote.quantity === modelConfig.quantity ? quote.price : null,
                quote.currency
              )}
              deliveryTime={formatDeliveryTime(shipping.deliveryTime)}
              shippingMethod={shipping.name}
              providerId={shipping.vendorId}
              materialName={materialName}
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
              onMagnify={() => openModelViewer(model)}
            />
          )
        )}
      </ModelListPartial>
    </Section>
  )

  const paymentSection = () => {
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
      <PaymentSection
        classNames={['u-margin-bottom']}
        subtotal={formatPrice(showCart ? cart.subTotalPrice : null, cart.currency)}
        shippings={cartShippings.map(shipping => ({
          label: getProviderName(shipping.vendorId),
          price: formatPrice(showCart ? shipping.price : null, shipping.currency)
        }))}
        vat={showVat ? formatPrice(showCart ? cart.vatPrice : null, cart.currency) : ''}
        total={showCart ? formatPrice(totalPrice, cart.currency) : <LoadingIndicator />}
      >
        <Button block label="Checkout" onClick={() => goToReviewOrder()} disabled={!showCart} />
      </PaymentSection>
    )
  }

  const warningNotificationSection = () => (
    <Notification
      classNames={['u-margin-bottom']}
      warning
      message={`For ${modelConfigs.length - modelsWithConfig.length} of ${
        modelConfigs.length
      } uploaded items you have not chosen a material. They have not been added to your cart.`}
      button={
        <Button
          label="Choose material"
          onClick={() =>
            goToUpload({
              selectModelConfigIds: modelConfigs
                .filter(
                  modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId === null
                )
                .map(modelConfig => modelConfig.id)
            })
          }
          compact
          minor
        />
      }
    />
  )

  const addedNotificationSection = () => (
    <Notification
      classNames={['u-margin-bottom']}
      message={`${numAddedItems} item${numAddedItems > 1 ? 's' : ''} added to your cart.`}
    />
  )

  // If you reload the page within the cart it is possible that the cart is empty but numAddedItems is still set
  // therefore also check if the page has models at all.
  const hasAddedItems = hasModels && numAddedItems > 0
  const hasItemsOnUploadPage = modelConfigs.length > modelsWithConfig.length

  return (
    <PageLayout header={<NavBarPartial />}>
      <Container>
        {(hasAddedItems || hasItemsOnUploadPage) && (
          <Section>
            {hasAddedItems && addedNotificationSection()}
            {hasItemsOnUploadPage && warningNotificationSection()}
          </Section>
        )}
        <Headline label="Your Cart" modifiers={['xl']} />
        {hasModels && (
          <SidebarLayout sidebar={paymentSection()}>{modelListSection()}</SidebarLayout>
        )}
        {!hasModels && (
          <Paragraph modifiers={['l']}>
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
  modelsWithConfig: selector.selectConfiguredModelInformation(state),
  modelConfigs: state.core.modelConfigs,
  cartShippings: selector.selectCartShippings(state),
  currency: state.core.currency,
  location: state.core.location,
  cart: state.core.cart,
  liableForVat: state.core.user && state.core.user.liableForVat,
  featureFlags: state.core.featureFlags,
  hasOnlyValidModelConfigsWithQuote: selector.hasOnlyValidModelConfigsWithQuote(state),
  isQuotePollingDone: selector.isQuotePollingDone(state),
  isCartUpToDate: selector.isCartUpToDate(state)
})

const mapDispatchToProps = dispatch => ({
  goToReviewOrder: bindActionCreators(navigationAction.goToReviewOrder, dispatch),
  goToUpload: bindActionCreators(navigationAction.goToUpload, dispatch),
  deleteModelConfigs: bindActionCreators(modelAction.deleteModelConfigs, dispatch),
  goToEditMaterial: bindActionCreators(navigationAction.goToEditMaterial, dispatch),
  openModelViewer: bindActionCreators(modelViewerAction.open, dispatch),
  updateQuantities: bindActionCreators(modelAction.updateQuantities, dispatch),
  receiveQuotes: bindActionCreators(quoteAction.receiveQuotes, dispatch),
  duplicateModelConfig: id => {
    const action = modelAction.duplicateModelConfig(id)
    return dispatch(action).then(() => {
      dispatch(navigationAction.goToMaterial([action.payload.nextId]))
    })
  }
})

export default compose(
  scrollToTop(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  guard(props => props.modelsWithConfig.length > 0),
  withProps(({location}) => ({
    numAddedItems: (location.state || {}).numAddedItems || 0
  })),
  withPropsOnChange(
    () => false, // Should never reinitialize the debounce function
    ({receiveQuotes}) => ({
      debouncedReceiveQuotes: debounce(receiveQuotes, 1000)
    })
  ),
  lifecycle({
    componentWillMount() {
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

      // Refresh quotes if cart got invalid
      if (!this.props.hasOnlyValidModelConfigsWithQuote && this.props.isQuotePollingDone) {
        const modelConfigs = this.props.modelConfigs
        const {refresh} = this.props.featureFlags
        const currency = this.props.currency
        const {countryCode} = this.props.location

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
