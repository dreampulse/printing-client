import React from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'
import compact from 'lodash/compact'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import intersection from 'lodash/intersection'
import lifecycle from 'recompose/lifecycle'

import deleteIcon from '../../asset/icon/delete.svg'
import copyIcon from '../../asset/icon/copy.svg'
import zoomInIcon from '../../asset/icon/zoom-in.svg'

import {formatDimensions} from '../lib/formatter'
import * as printingEngine from '../lib/printing-engine'
import * as selector from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'

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
import PageLayout from '../component/page-layout'
import Container from '../component/container'
import ModelUploadList from '../component/model-upload-list'
import StickyFooter from '../component/sticky-footer'

const UploadPage = ({
  openPickUnitModal,
  deleteModelConfigs,
  updateQuantities,
  duplicateModelConfig,
  modelsWithConfig,
  goToMaterial,
  openModelViewer,
  cart,
  location,
  featureFlags,
  selectedModelConfigIds,
  toggleId,
  toggleAll,
  createConfiguration
}) => {
  const numModels = modelsWithConfig.length
  const hasModels = numModels > 0

  const promoSection = () => (
    <Section>
      <Grid>
        <Column md={0} lg={4} />
        <Column md={12} lg={4}>
          <RichText classNames={['u-margin-bottom-xl', 'u-align-center']}>
            Large quantities, recurring orders or special requirements?
          </RichText>
          <div className="u-align-center ">
            <Button
              minor
              label="Contact Us"
              onClick={() => global.window.open('https://craftcloud.all3dp.com/contact', '_blank')}
            />
          </div>
        </Column>
        <Column md={0} lg={4} />
      </Grid>
    </Section>
  )

  const locationNotification = ({message, warning}) => (
    <Notification message={message} warning={warning} />
  )

  const notificationSection = () => (
    <Section>
      {location.state &&
        location.state.notification &&
        locationNotification(location.state.notification)}
    </Section>
  )

  const modelList = () =>
    numModels === 0 ? (
      <UploadArea
        l
        label="Drag any 3D files here or"
        linkLabel="select files"
        description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
        accept="*"
        onChange={openPickUnitModal}
      />
    ) : (
      <ModelUploadList
        uploadArea={
          <UploadArea
            s
            label="Drag additional 3D files here or"
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
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
                buttonsRight={
                  <ButtonBar>
                    <Button
                      icon={zoomInIcon}
                      iconOnly
                      onClick={() => openModelViewer(modelConfig)}
                    />
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
    <PageLayout
      footer={<FooterPartial />}
      header={<NavBarPartial />}
      showStickyFooter={hasModels}
      minorBackground={hasModels}
      stickyFooter={
        <StickyFooter>
          {featureFlags.share && (
            <Button
              text
              disabled={selectedModelConfigIds.length === 0}
              label="Share configuration"
              onClick={() => createConfiguration(selectedModelConfigIds)}
            />
          )}
          {modelsWithConfig.length > 0 && (
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
            label={`Select Material (${selectedModelConfigIds.length}/${numModels})`}
            onClick={() => goToMaterial(selectedModelConfigIds)}
          />
        </StickyFooter>
      }
    >
      <Container full={Boolean(cart)}>
        {cart ? (
          <LocationInfoPartial />
        ) : (
          <Section>
            <ConfigurationHeaderPartial />
          </Section>
        )}
      </Container>
      <Container>
        {location.state && location.state.notification && notificationSection()}
        {hasModels && (
          <Headline
            classNames={['u-align-center']}
            modifiers={['xl', 'light']}
            label="Which files do you want to customize first?"
          />
        )}
        <Section>{modelList()}</Section>
        {!hasModels && promoSection()}
      </Container>
    </PageLayout>
  )
}

const mapStateToProps = state => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  modelsWithConfig: unzip([
    state.core.modelConfigs,
    selector.selectModelsOfModelConfigs(state)
  ]).filter(([modelConfig]) => modelConfig.type !== 'UPLOADED' || modelConfig.quoteId === null),
  cart: state.core.cart,
  featureFlags: state.core.featureFlags,
  useSameMaterial: state.core.useSameMaterial,
  uploadedModelConfigs: selector.selectUploadedModelConfigs(state)
})

const mapDispatchToProps = {
  openPickUnitModal: modalAction.openPickUnitModal,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  updateQuantities: modelAction.updateQuantities,
  duplicateModelConfig: modelAction.duplicateModelConfig,
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
  withProps(({modelsWithConfig}) => {
    const numModelsUploading = modelsWithConfig.reduce(
      (sum, [modelConfig, model]) =>
        modelConfig.type === 'UPLOADING' && !model.error ? sum + 1 : sum,
      0
    )
    const isUploadCompleted = numModelsUploading === 0
    return {
      numModelsUploading,
      isUploadCompleted
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
  }),
  lifecycle({
    componentDidMount() {
      const {location} = this.props
      const allModelConfigIds = this.props.uploadedModelConfigs.map(modelConfig => modelConfig.id)
      const selectModelConfigIds = (location.state && location.state.selectModelConfigIds) || []
      const filteredModelConfigIds = intersection(allModelConfigIds, selectModelConfigIds)
      this.props.updateSelectedModelConfigs(filteredModelConfigIds)
    }
  })
)

export default enhance(UploadPage)
