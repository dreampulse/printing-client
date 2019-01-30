import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'
import compact from 'lodash/compact'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'

import deleteIcon from '../../asset/icon/delete.svg'
import copyIcon from '../../asset/icon/copy.svg'
import cartIcon from '../../asset/icon/cart.svg'

import {formatDimensions, formatPrice} from '../lib/formatter'
import {selectModelsOfModelConfigs, selectCartCount} from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'
import scrollTo from '../service/scroll-to'

import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'
import * as modelViewerAction from '../action/model-viewer'
import * as modalAction from '../action/modal'

import AppLayout from './app-layout'
import ModelListPartial from './model-list-partial'
import MaterialPartial from './material-partial'
import ConfigurationHeaderPartial from './configuration-header-partial'
import FooterPartial from './footer-partial'

import Section from '../component/section'
import Headline from '../component/headline'
import UploadArea from '../component/upload-area'
import DeprecatedUploadModelItemError from '../component/deprecated-upload-model-item-error'
import DeprecatedUploadModelItemLoad from '../component/deprecated-upload-model-item-load'
import DeprecatedUploadModelItem from '../component/deprecated-upload-model-item'
import Button from '../component/button'
import ButtonBar from '../component/button-bar'
import Notification from '../component/notification'
import NumberField from '../component/number-field'
import Grid from '../component/grid'
import Column from '../component/column'
import RichText from '../component/rich-text'

const UploadPage = ({
  openPickUnitModal,
  deleteModelConfigs,
  updateQuantities,
  duplicateModelConfig,
  modelsWithConfig,
  goToCart,
  openModelViewer,
  cart,
  cartCount,
  location,
  featureFlags,
  selectedModelConfigIds,
  numModelsUploading,
  isUploadCompleted
}) => {
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0

  const promoSection = () => (
    <Fragment>
      <Section>
        <Headline
          label="Make it Printable"
          modifiers={['l', 'light']}
          classNames={['u-margin-bottom-l', 'u-align-center']}
        />
        <Grid>
          <Column md={0} lg={3} />
          <Column md={12} lg={6}>
            <RichText modifiers={['l']} classNames={['u-margin-bottom-xl', 'u-align-center']}>
              <strong>Create</strong>, <strong>repair</strong> or <strong>modify</strong> 3D models
            </RichText>
            <div className="u-align-center ">
              <Button
                modifiers={['minor']}
                label="Visit our Design Service"
                onClick={() => {
                  global.open('https://all3dp.layr.co/', '_blank')
                }}
              />
            </div>
          </Column>
          <Column md={0} lg={3} />
        </Grid>
      </Section>
    </Fragment>
  )

  const uploadSection = () => (
    <Section>
      <UploadArea
        label="Drag any 3D files here or"
        linkLabel="select files"
        description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
        accept="*"
        onChange={openPickUnitModal}
        modifiers={compact([numModels === 0 && 'l'])}
      />
    </Section>
  )

  const buttonBar = modelConfig => (
    <ButtonBar>
      <NumberField
        modifiers={['tiny']}
        value={modelConfig.quantity}
        onChange={quantity => updateQuantities([modelConfig.id], quantity)}
      />
      <Button
        icon={copyIcon}
        modifiers={['tiny', 'icon-only', 'minor']}
        onClick={() => duplicateModelConfig(modelConfig.id)}
      />
      <Button
        icon={deleteIcon}
        modifiers={['tiny', 'icon-only', 'minor']}
        onClick={() => deleteModelConfigs([modelConfig.id])}
      />
    </ButtonBar>
  )

  const modelListSection = () => (
    <Section>
      <Headline
        label={
          isUploadCompleted
            ? 'Your Files'
            : `Uploading files ${numModelsUploading} of ${numModels}…`
        }
        modifiers={['xl']}
      />
      <ModelListPartial
        enableShare={featureFlags.share}
        onPrimaryActionClick={() => scrollTo('#section-material')}
      >
        {modelsWithConfig.map(([modelConfig, model]) => {
          if (modelConfig.type === 'UPLOADING') {
            if (model.error) {
              return (
                <DeprecatedUploadModelItemError
                  key={modelConfig.id}
                  title="Upload failed"
                  subline={model.errorMessage}
                  onDelete={() => deleteModelConfigs([modelConfig.id])}
                />
              )
            }
            return (
              <DeprecatedUploadModelItemLoad
                key={modelConfig.id}
                status={model.progress}
                title="Uploading"
                subline={model.fileName}
                onDelete={() => deleteModelConfigs([modelConfig.id])}
              />
            )
          }
          if (modelConfig.type === 'UPLOADED' && !modelConfig.quoteId) {
            return (
              <DeprecatedUploadModelItem
                key={modelConfig.id}
                id={modelConfig.id}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
                buttonBar={buttonBar(modelConfig)}
                onMagnify={() => openModelViewer(model)}
              />
            )
          }

          return null
        })}
      </ModelListPartial>
    </Section>
  )

  const cartNotification = () => (
    <Notification
      message={`${cartCount} item${cartCount > 1 ? 's' : ''} added to your cart`}
      button={
        <Button
          label="Cart"
          icon={cartIcon}
          onClick={() => goToCart()}
          modifiers={['compact', 'minor']}
        />
      }
    >
      Cart subtotal ({cartCount} item{cartCount > 1 ? 's' : ''}):&nbsp;
      <strong>{formatPrice(cart.totalPrice, cart.currency)}</strong>
    </Notification>
  )

  const locationNotification = ({message, warning}) => (
    <Notification message={message} warning={warning} />
  )

  const notificationSection = () => (
    <Section>
      {cart && cartNotification()}
      {location.state &&
        location.state.notification &&
        locationNotification(location.state.notification)}
    </Section>
  )

  return (
    <AppLayout footer={<FooterPartial />}>
      <Section>
        <ConfigurationHeaderPartial />
      </Section>
      {(cart || (location.state && location.state.notification)) && notificationSection()}
      {uploadSection()}
      {hasModels && modelListSection()}
      {hasModels && selectedModelConfigIds.length > 0 && (
        <MaterialPartial configIds={selectedModelConfigIds} isUploadPage />
      )}
      {!hasModels && promoSection()}
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  modelsWithConfig: unzip([state.core.modelConfigs, selectModelsOfModelConfigs(state)]).filter(
    ([modelConfig]) => {
      const mc = modelConfig // Flow bug with detecting correct branch in union type
      return mc.type !== 'UPLOADED' || mc.quoteId === null
    }
  ),
  cart: state.core.cart,
  cartCount: selectCartCount(state),
  featureFlags: state.core.featureFlags,
  useSameMaterial: state.core.useSameMaterial
})

const mapDispatchToProps = {
  openPickUnitModal: modalAction.openPickUnitModal,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  updateQuantities: modelAction.updateQuantities,
  duplicateModelConfig: modelAction.duplicateModelConfig,
  goToCart: navigationAction.goToCart,
  openModelViewer: modelViewerAction.open
}

const enhance = compose(
  scrollToTop(),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({modelsWithConfig, selectedModelConfigIds}) => {
    const numModelsUploading = modelsWithConfig.reduce(
      (sum, [modelConfig, model]) =>
        modelConfig.type === 'UPLOADING' && !model.error ? sum + 1 : sum,
      0
    )
    const isUploadCompleted = numModelsUploading === 0

    // Special case when there is only one uploaded model the checkbox for selecting the model aren't shown anymore
    // therefore we have to guarantee that the model is always selected.
    const updatedSelectedModelConfigIds = [...selectedModelConfigIds]
    if (updatedSelectedModelConfigIds.length === 0 && modelsWithConfig.length === 1) {
      const modelConfig = modelsWithConfig[0][0]
      if (modelConfig.type === 'UPLOADED') {
        updatedSelectedModelConfigIds.push(modelConfig.id)
      }
    }

    return {
      numModelsUploading,
      isUploadCompleted,
      selectedModelConfigIds: updatedSelectedModelConfigIds
    }
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (
        this.props.isUploadCompleted &&
        !prevProps.isUploadCompleted &&
        this.props.useSameMaterial
      ) {
        scrollTo('#section-material')
      }
    }
  })
)

export default enhance(UploadPage)
