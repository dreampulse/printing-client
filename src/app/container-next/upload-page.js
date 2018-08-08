// @flow

import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'

// TODO: Use final svg images here!
import feature1Image from '../../asset/image/feature1.png'
import feature2Image from '../../asset/image/feature2.png'
// import feature3Image from '../../../asset/image/feature3.png'

import {formatDimensions, formatPrice} from '../lib/formatter'
import {getProviderName} from '../lib/provider-selector'
import {selectModelsOfModelConfigs, selectCartCount} from '../lib/selector'
import type {AppState} from '../reducer-next'

import * as modelAction from '../action-next/model'
import * as navigationAction from '../action-next/navigation'
import * as modelViewerAction from '../action-next/model-viewer'

import AppLayout from './app-layout'
import ModelListPartial from './model-list-partial'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import SplitLayout from '../component/split-layout'
import Headline from '../component/headline'
import Baloon from '../component/baloon'
import FeatureParagraph from '../component/feature-paragraph'
import Image from '../component/image'
import UploadArea from '../component/upload-area'
import UploadModelItemError from '../component/upload-model-item-error'
import UploadModelItemLoad from '../component/upload-model-item-load'
import UploadModelItem from '../component/upload-model-item'
import Button from '../component/button'
import ButtonBar from '../component/button-bar'
import Notification from '../component/notification'

import deleteIcon from '../../asset/icon/delete.svg'
import plusIcon from '../../asset/icon/plus.svg'
import minusIcon from '../../asset/icon/minus.svg'
import copyIcon from '../../asset/icon/copy.svg'
import cartIcon from '../../asset/icon/cart.svg'

const UploadPage = ({
  onUploadFiles,
  onDeleteModelConfigs,
  onChangeQuantities,
  onChooseMaterial,
  onDuplicateModelConfig,
  modelsWithConfig,
  onGoToCart,
  onMagnifyModel,
  cart,
  cartCount
}) => {
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0
  const numModelsUploading = modelsWithConfig.reduce(
    (sum, [modelConfig, model]) =>
      modelConfig.type === 'UPLOADING' && !model.error ? sum + 1 : sum,
    0
  )
  const isUploadCompleted = numModelsUploading === 0

  const promoSection = () => (
    <Fragment>
      <Section>
        <Headline
          label="Save up to 70% on industrial 3D printing"
          modifiers={['l', 'light']}
          classNames={['u-margin-bottom-xxl']}
        />
        <SplitLayout
          leftContent={[
            <FeatureParagraph key="feature1" image={<Image src={feature1Image} />}>
              Compare offers from the top providers and order instantly
            </FeatureParagraph>,
            <FeatureParagraph key="feature2" image={<Image src={feature2Image} />}>
              The widest material choice and the fastest delivery
            </FeatureParagraph>
            /*
            <FeatureParagraph key="feature3" image={feature3Image}>
              Split your order accross multiple providers, effortlessly
            </FeatureParagraph>
            */
          ]}
          rightContent={[
            <Baloon key="baloon1">
              Impossible! My favorite printing service is always the cheapest.
            </Baloon>,
            <Baloon key="baloon2" modifiers={['right']}>
              Not Always! Prices vary hugely based on model and material. Here you will always find
              the best deal.
            </Baloon>
          ]}
        />
      </Section>
      <ProviderTeaser>
        <ProviderImage slug="shapeways" name={getProviderName('shapeways')} />
        <ProviderImage slug="imaterialise" name={getProviderName('imaterialise')} />
        <ProviderImage slug="sculpteo" name={getProviderName('sculpteo')} />
        <ProviderImage slug="trinckle" name={getProviderName('trinckle')} />
        <ProviderImage slug="treatstock" name={getProviderName('treatstock')} />
        <ProviderImage slug="ff3dm" name={getProviderName('ff3dm')} />
      </ProviderTeaser>
    </Fragment>
  )

  const notificationSection = () => (
    <Section>
      <Notification
        message={`${cartCount} item${cartCount > 1 ? 's' : ''} added to your cart`}
        button={
          <Button
            label="Cart"
            icon={cartIcon}
            onClick={() => onGoToCart()}
            modifiers={['compact', 'minor']}
          />
        }
      >
        Cart subtotal ({cartCount} item{cartCount > 1 ? 's' : ''}):&nbsp;
        <strong>{formatPrice(cart.totalPrice, cart.currency)}</strong>
      </Notification>
    </Section>
  )

  const uploadSection = () => (
    <Section>
      <UploadArea
        label="Drag any 3D files here or"
        linkLabel="select files"
        description="Supported file formats: STL, OBJ, WRL, SKP, DAE, 3DS, IGS, FBX, PLY, X3D, STP, PRT, …"
        accept="*"
        onChange={onUploadFiles}
      />
    </Section>
  )

  const buttonBar = modelConfig => (
    <ButtonBar>
      <Button
        label="Choose material …"
        modifiers={['tiny', 'minor']}
        onClick={() => onChooseMaterial([modelConfig.id])}
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
      <Headline
        label={
          isUploadCompleted ? 'Choose material' : `Uploading (${numModelsUploading}/${numModels})…`
        }
        modifiers={['xl']}
      />
      <ModelListPartial>
        {modelsWithConfig.map(([modelConfig, model]) => {
          if (modelConfig.type === 'UPLOADING') {
            if (model.error) {
              return (
                <UploadModelItemError
                  key={modelConfig.id}
                  title="Upload failed"
                  subline={model.errorMessage}
                  onDelete={() => onDeleteModelConfigs([modelConfig.id])}
                />
              )
            }
            return (
              <UploadModelItemLoad
                key={modelConfig.id}
                status={model.progress}
                title="Uploading"
                subline={model.fileName}
                onDelete={() => onDeleteModelConfigs([modelConfig.id])}
              />
            )
          }
          if (modelConfig.type === 'UPLOADED' && !modelConfig.quoteId) {
            return (
              <UploadModelItem
                key={modelConfig.id}
                id={modelConfig.id}
                quantity={modelConfig.quantity}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
                buttonBar={buttonBar(modelConfig)}
                onMagnify={() => onMagnifyModel(model)}
              />
            )
          }

          return null
        })}
      </ModelListPartial>
    </Section>
  )

  return (
    <AppLayout>
      {cart && notificationSection()}
      {uploadSection()}
      {hasModels && modelListSection()}
      {!hasModels && promoSection()}
    </AppLayout>
  )
}

const mapStateToProps = (state: AppState) => ({
  modelsWithConfig: unzip([
    state.core.modelConfigs,
    selectModelsOfModelConfigs(state)
  ]).filter(([modelConfig]) => {
    const mc = (modelConfig: any) // Flow bug with detecting correct branch in union type
    return mc.type !== 'UPLOADED' || mc.quoteId === null
  }),
  cart: state.core.cart,
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  onUploadFiles: modelAction.uploadFiles,
  onDeleteModelConfigs: modelAction.deleteModelConfigs,
  onChangeQuantities: modelAction.updateQuantities,
  onDuplicateModelConfig: modelAction.duplicateModelConfig,
  onChooseMaterial: navigationAction.goToMaterial,
  onGoToCart: navigationAction.goToCart,
  onMagnifyModel: modelViewerAction.open
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage)
