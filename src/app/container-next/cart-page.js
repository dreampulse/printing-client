// @flow

import React from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'

import type {ModelConfig} from '../type-next'
import type {AppState} from '../reducer-next'
import {selectModelsOfModelConfigs} from '../lib/selector'
import {formatPrice, formatDimensions, formatDeliveryTime} from '../lib/formatter'

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

import {goToUpload} from '../action-next/navigation'
import {updateQuantities, deleteModelConfigs, duplicateModelConfig} from '../action-next/model'

import AppLayout from './app-layout'
import ModelListPartial from './model-list-partial'

import deleteIcon from '../../asset/icon/delete.svg'
import plusIcon from '../../asset/icon/plus.svg'
import minusIcon from '../../asset/icon/minus.svg'
import copyIcon from '../../asset/icon/copy.svg'

const CartPage = ({
  modelsWithConfig,
  onEditMaterial,
  onChangeQuantities,
  onGoToUpload,
  onCheckout,
  onDuplicateModelConfig,
  onDeleteModelConfigs
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
        {modelsWithConfig.map(([modelConfig, model]) => (
          <ModelItem
            key={modelConfig.id}
            id={modelConfig.id}
            quantity={modelConfig.quantity}
            imageSource={model.thumbnailUrl}
            title={model.fileName}
            subline={formatDimensions(model.dimensions, model.fileUnit)}
            buttonBar={buttonBar(modelConfig)}
            price={formatPrice(80.99, 'EUR')}
            deliveryTime={formatDeliveryTime(7)}
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
        ))}
      </ModelListPartial>
    </Section>
  )

  const paymentSection = () => (
    /* TODO Payment section has to be updated to new layout */
    <PaymentSection
      subtotal="$245.25"
      shippingPrice="$50.00"
      shippingName="DHL"
      vat="$50.00"
      total="$345.00"
      onContactLinkClick={() => {}}
    >
      <Button modifiers={['block']} label="Checkout" onClick={onCheckout} />
    </PaymentSection>
  )

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
    selectModelsOfModelConfigs(state)
  ]).filter(([modelConfig]) => {
    const mc = (modelConfig: any) // Flow bug with detecting correct branch in union type
    return mc.type === 'UPLOADED' && mc.quoteId !== null
  })
})

const mapDispatchToProps = {
  onGoToUpload: goToUpload,
  onDeleteModelConfigs: deleteModelConfigs,
  onChangeQuantities: updateQuantities,
  onDuplicateModelConfig: duplicateModelConfig,
  onEditMaterial: /* TODO: openConfigurationModal() */ () => {},
  onCheckout: /* TODO: goToCheckout() */ () => {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
