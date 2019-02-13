import React from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'
import compact from 'lodash/compact'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'

import deleteIcon from '../../asset/icon/delete.svg'
import copyIcon from '../../asset/icon/copy.svg'
import cartIcon from '../../asset/icon/cart.svg'
import zoomInIcon from '../../asset/icon/zoom-in.svg'

import {formatDimensions, formatPrice} from '../lib/formatter'
import * as printingEngine from '../lib/printing-engine'
import * as selector from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'
import {openIntercom} from '../service/intercom'

import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'
import * as modelViewerAction from '../action/model-viewer'
import * as modalAction from '../action/modal'

import ConfigurationHeaderPartial from './configuration-header-partial'
import LocationInfoPartial from './location-info-partial'
import FooterPartial from './footer-partial'
import NavBarPartial from './nav-bar-partial'

import Section from '../component/section'
import Headline from '../component/headline'
import UploadArea from '../component/upload-area'
import UploadModelItemError from '../component/upload-model-item-error'
import UploadModelItemLoad from '../component/upload-model-item-load'
import UploadModelItem from '../component/upload-model-item'
import Button from '../component/button'
import ButtonBar from '../component/button-bar'
import Notification from '../component/notification'
import NumberField from '../component/number-field'
import Grid from '../component/grid'
import Column from '../component/column'
import RichText from '../component/rich-text'
import UploadLayout from '../component/upload-layout'
import Container from '../component/container'
import ModelUploadList from '../component/model-upload-list'

const UploadPage = ({
  openPickUnitModal,
  deleteModelConfigs,
  updateQuantities,
  duplicateModelConfig,
  modelsWithConfig,
  goToCart,
  goToMaterial,
  openModelViewer,
  cart,
  cartCount,
  location,
  featureFlags,
  selectedModelConfigIds,
  numModelsUploading,
  isUploadCompleted,
  toggleId,
  toggleAll,
  createConfiguration
}) => {
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0

  const promoSection = () => (
    <Section>
      <Headline
        label="Need a Quote?"
        modifiers={['l', 'light']}
        classNames={['u-margin-bottom-l', 'u-align-center']}
      />
      <Grid>
        <Column md={0} lg={3} />
        <Column md={12} lg={6}>
          <RichText modifiers={['l']} classNames={['u-margin-bottom-xl', 'u-align-center']}>
            Large quantities, recurring orders or special requirements
          </RichText>
          <div className="u-align-center ">
            <Button minor label="Contact Us" onClick={() => openIntercom()} />
          </div>
        </Column>
        <Column md={0} lg={3} />
      </Grid>
    </Section>
  )

  const cartNotification = () => (
    <Notification
      message={`${cartCount} item${cartCount > 1 ? 's' : ''} added to your cart`}
      button={<Button label="Cart" icon={cartIcon} onClick={() => goToCart()} />}
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

  const modelList = () => (
    <ModelUploadList
      uploadArea={
        <UploadArea
          modifiers={compact([numModels === 0 && 'l', modelsWithConfig.length >= 1 && 's'])}
          label={
            modelsWithConfig.length > 0
              ? 'Drag additional 3D files here or'
              : 'Drag any 3D files here or'
          }
          linkLabel="select files"
          description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
          accept="*"
          onChange={openPickUnitModal}
        />
      }
    >
      {modelsWithConfig.map(([modelConfig, model]) => {
        if (modelConfig.type === 'UPLOADING') {
          if (model.error) {
            return (
              <UploadModelItemError
                key={modelConfig.id}
                title="Upload failed"
                subline={model.errorMessage}
                buttonsRight={
                  <ButtonBar>
                    <Button
                      icon={deleteIcon}
                      iconOnly
                      onClick={() => deleteModelConfigs([modelConfig.id])}
                    />
                  </ButtonBar>
                }
              />
            )
          }
          return (
            <UploadModelItemLoad
              key={modelConfig.id}
              status={model.progress}
              title="Uploading"
              subline={model.fileName}
              buttonsRight={
                <ButtonBar>
                  <Button
                    icon={deleteIcon}
                    iconOnly
                    onClick={() => deleteModelConfigs([modelConfig.id])}
                  />
                </ButtonBar>
              }
            />
          )
        }
        if (modelConfig.type === 'UPLOADED' && !modelConfig.quoteId) {
          return (
            <UploadModelItem
              key={modelConfig.id}
              id={modelConfig.id}
              imageSource={model.thumbnailUrl}
              title={model.fileName}
              subline={formatDimensions(model.dimensions, model.fileUnit)}
              buttonsRight={
                <ButtonBar>
                  <Button icon={zoomInIcon} iconOnly onClick={() => openModelViewer(modelConfig)} />
                  <Button
                    icon={copyIcon}
                    iconOnly
                    onClick={() => duplicateModelConfig(modelConfig.id)}
                  />
                  <Button
                    icon={deleteIcon}
                    iconOnly
                    onClick={() => deleteModelConfigs([modelConfig.id])}
                  />
                </ButtonBar>
              }
              selected={selectedModelConfigIds.includes(modelConfig.id)}
              onSelect={() => toggleId(modelConfig.id)}
              buttonsLeft={
                modelConfig.quantity && (
                  <NumberField
                    value={modelConfig.quantity}
                    onChange={quantity => updateQuantities([modelConfig.id], quantity)}
                  />
                )
              }
            />
          )
        }
        return null
      })}
    </ModelUploadList>
  )

  return (
    <UploadLayout
      footer={<FooterPartial />}
      header={<NavBarPartial />}
      hasModels={hasModels}
      stickyFooter={
        <>
          {featureFlags.share && (
            <Button
              disabled={selectedModelConfigIds.length === 0}
              label="Share configuration"
              onClick={() => createConfiguration(selectedModelConfigIds)}
            />
          )}
          {modelsWithConfig.length > 1 && (
            <Button
              text
              label={
                selectedModelConfigIds.length === modelsWithConfig.length
                  ? 'Deselect all files'
                  : 'Select all files'
              }
              onClick={() => toggleAll()}
            />
          )}
          <Button
            disabled={!selectedModelConfigIds.length > 0}
            label={`Customize (${selectedModelConfigIds.length}/${numModels})`}
            onClick={() => goToMaterial(selectedModelConfigIds)}
          />
        </>
      }
    >
      <Container>
        {hasModels ? (
          <LocationInfoPartial />
        ) : (
          <Section>
            <ConfigurationHeaderPartial />
          </Section>
        )}
        {(cart || (location.state && location.state.notification)) && notificationSection()}
        {hasModels && (
          <Headline
            classNames={['u-align-center']}
            modifiers={['xl']}
            label="Which files do you want to customize first?"
          />
        )}
        {modelList()}
        {!hasModels && promoSection()}
      </Container>
    </UploadLayout>
  )
}

const mapStateToProps = state => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  modelsWithConfig: unzip([
    state.core.modelConfigs,
    selector.selectModelsOfModelConfigs(state)
  ]).filter(([modelConfig]) => modelConfig.type !== 'UPLOADED' || modelConfig.quoteId === null),
  cart: state.core.cart,
  cartCount: selector.selectCartCount(state),
  featureFlags: state.core.featureFlags,
  useSameMaterial: state.core.useSameMaterial,
  uploadedModelConfigs: selector.selectUploadedModelConfigs(state)
})

const mapDispatchToProps = {
  openPickUnitModal: modalAction.openPickUnitModal,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  updateQuantities: modelAction.updateQuantities,
  duplicateModelConfig: modelAction.duplicateModelConfig,
  goToCart: navigationAction.goToCart,
  goToMaterial: navigationAction.goToMaterial,
  openModelViewer: modelViewerAction.open,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  openShareConfigurationModal: modalAction.openShareConfigurationModal
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
  withHandlers({
    toggleId: ({updateSelectedModelConfigs, selectedModelConfigIds}) => id => {
      if (selectedModelConfigIds.includes(id)) {
        updateSelectedModelConfigs(selectedModelConfigIds.filter(item => item !== id))
      } else {
        updateSelectedModelConfigs([...selectedModelConfigIds, id])
      }
    },
    toggleAll: ({updateSelectedModelConfigs, modelsWithConfig, selectedModelConfigIds}) => () => {
      if (modelsWithConfig.length === selectedModelConfigIds.length) {
        updateSelectedModelConfigs([])
      } else {
        updateSelectedModelConfigs(modelsWithConfig.map(([modelConfig]) => modelConfig.id))
      }
    },
    createConfiguration: ({
      uploadedModelConfigs,
      fatalError,
      openShareConfigurationModal
    }) => configIds => {
      const items = compact(
        configIds.map(configId => {
          const modelConfig = uploadedModelConfigs.find(mc => mc.id === configId)
          if (!modelConfig) {
            return null
          }
          return {
            modelId: modelConfig.modelId,
            quantity: modelConfig.quantity
          }
        })
      )

      printingEngine
        .createConfiguration({items})
        .then(({configurationId}) => {
          openShareConfigurationModal(configurationId)
        })
        .catch(fatalError)
    }
  })
)

export default enhance(UploadPage)
