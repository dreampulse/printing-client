// @flow

import React from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'

import type {AppState} from '../reducer-next'
import {
  selectModelsOfModelConfigs,
  selectShippingsOfModelConfigs,
  selectUniqueChosenShippings,
  selectQuotesOfModelConfigs
} from '../lib/selector'
import {formatPrice, formatDimensions, formatDeliveryTime} from '../lib/formatter'
import {getProviderName, getMaterialTreeByMaterialConfigId} from '../lib/material'
import getCloudinaryUrl from '../lib/cloudinary'

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

import * as navigationAction from '../action-next/navigation'
import * as modelAction from '../action-next/model'
import * as cartAction from '../action-next/cart'
import * as modelViewerAction from '../action-next/model-viewer'

import AppLayout from './app-layout'
import ModelListPartial from './model-list-partial'

import deleteIcon from '../../asset/icon/delete.svg'
// import plusIcon from '../../asset/icon/plus.svg'
// import minusIcon from '../../asset/icon/minus.svg'
import copyIcon from '../../asset/icon/copy.svg'

const CartPage = ({
  modelsWithConfig,
  onEditMaterial,
  onGoToUpload,
  onCheckout,
  onDuplicateModelConfig,
  onDeleteModelConfigs,
  cart,
  chosenShippings,
  materialGroups,
  onMagnifyModel
}) => {
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0

  const buttonBar = modelConfig => (
    <ButtonBar>
      <Button
        label="Edit material …"
        modifiers={['tiny', 'minor']}
        onClick={() => onEditMaterial([modelConfig.id])}
      />
      {/*
      TODO: Quantity change in card is hard to solve because we have to do another price request and match old to new quotes afterwards, which makes all of this async
      <Button
        icon={minusIcon}
        disabled={modelConfig.quantity === 1}
        modifiers={['tiny', 'circular', 'minor']}
        onClick={() => onChangeQuantities([modelConfig.id], modelConfig.quantity - 1)}
      />
      <Button
        icon={plusIcon}
        modifiers={['tiny', 'circular', 'minor']}
        onClick={() => onChangeQuantities([modelConfig.id], modelConfig.quantity + 1)}
      />
      */}
      <Button
        icon={copyIcon}
        modifiers={['tiny', 'circular', 'minor']}
        onClick={() => onDuplicateModelConfig(modelConfig.id)}
      />
      <Button
        icon={deleteIcon}
        modifiers={['tiny', 'circular', 'minor']}
        onClick={() => onDeleteModelConfigs([modelConfig.id])}
      />
    </ButtonBar>
  )

  const modelListSection = () => (
    <Section>
      <ModelListPartial editMode>
        {modelsWithConfig.map(([modelConfig, model, shipping, quote]) => {
          const materialTree = getMaterialTreeByMaterialConfigId(
            materialGroups,
            quote.materialConfigId
          )
          const process = materialTree.finishGroup.properties.printingMethodShort
          const providerInfo =
            materialTree.finishGroup.properties.printingServiceName[quote.vendorId]
          const {id: materialConfigId, colorCode, color, colorImage} = materialTree.materialConfig

          return (
            <ModelItem
              key={modelConfig.id}
              id={modelConfig.id}
              quantity={modelConfig.quantity}
              imageSource={model.thumbnailUrl}
              title={model.fileName}
              subline={formatDimensions(model.dimensions, model.fileUnit)}
              buttonBar={buttonBar(modelConfig)}
              price={formatPrice(quote.price, quote.currency)}
              deliveryTime={formatDeliveryTime(shipping.deliveryTime)}
              shippingMethod={shipping.name}
              providerName={shipping.vendorId}
              materialName={process}
              providerMaterialName={providerInfo}
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
              onMagnify={() => onMagnifyModel(model)}
            />
          )
        })}
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

    return (
      <PaymentSection
        classNames={['u-margin-bottom']}
        subtotal={formatPrice(cart.subTotalPrice, cart.currency)}
        shippings={chosenShippings.map(shipping => ({
          label: getProviderName(shipping.vendorId),
          price: formatPrice(shipping.price, shipping.currency)
        }))}
        vat={formatPrice(999, cart.currency)} // TODO: cart.vatPrice is missing
        total={formatPrice(cart.totalPrice, cart.currency)}
      >
        <Button modifiers={['block']} label="Checkout" onClick={onCheckout} />
      </PaymentSection>
    )
  }

  return (
    <AppLayout>
      <Headline label="Your Cart" modifiers={['xl']} />
      {hasModels && <SidebarLayout sidebar={paymentSection()}>{modelListSection()}</SidebarLayout>}
      {!hasModels && (
        <Paragraph modifiers={['l']}>
          Your cart is currently empty. Start by{' '}
          <Link
            href="/"
            onClick={event => {
              event.preventDefault()
              onGoToUpload()
            }}
            label="uploading your 3D model"
          />{' '}
          for printing.
        </Paragraph>
      )}
    </AppLayout>
  )
}

const mapStateToProps = (state: AppState) => ({
  modelsWithConfig: unzip([
    state.core.modelConfigs,
    selectModelsOfModelConfigs(state),
    selectShippingsOfModelConfigs(state),
    selectQuotesOfModelConfigs(state)
  ]).filter(([modelConfig]) => {
    const mc = (modelConfig: any) // Flow bug with detecting correct branch in union type
    return mc.type === 'UPLOADED' && mc.quoteId !== null
  }),
  chosenShippings: selectUniqueChosenShippings(state),
  currency: state.core.currency,
  cart: state.core.cart,
  materialGroups: state.core.materialGroups
})

const mapDispatchToProps = {
  onGoToUpload: navigationAction.goToUpload,
  onDeleteModelConfigs: modelAction.deleteModelConfigs,
  onDuplicateModelConfig: modelAction.duplicateModelConfig,
  onCreateCart: cartAction.createCart,
  onEditMaterial: /* TODO: openConfigurationModal() */ () => {},
  onCheckout: navigationAction.goToAddress,
  onMagnifyModel: modelViewerAction.open
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
