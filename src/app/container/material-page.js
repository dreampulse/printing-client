import React, {useState} from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'
import uniq from 'lodash/uniq'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import lifecycle from 'recompose/lifecycle'
import intersection from 'lodash/intersection'

import backIcon from '../../asset/icon/back.svg'
import zoomInIcon from '../../asset/icon/zoom-in.svg'
import copyIcon from '../../asset/icon/copy.svg'
import deleteIcon from '../../asset/icon/delete.svg'

import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'
import * as modelViewerAction from '../action/model-viewer'
import * as modalAction from '../action/modal'

import config from '../../../config'
import {formatDimensions} from '../lib/formatter'
import {
  selectUploadedModelConfigs,
  selectCartCount,
  selectModelsOfModelConfigs,
  selectUnconfiguredModelConfigIds,
  selectConfiguredModelConfigIds,
  selectQuotes,
  selectIsPollingDone
} from '../lib/selector'
import useBreakpoints from '../hook/use-breakpoints'

import MaterialPartial from './material-partial'
import OfferFooterPartial from './offer-footer-partial'

import ToolLayout from '../component/tool-layout'
import Link from '../component/link'
import Headline from '../component/headline'
import Section from '../component/section'
import UploadModelItem from '../component/upload-model-item'
import Button from '../component/button'
import ButtonBar from '../component/button-bar'
import NumberField from '../component/number-field'
import Paragraph from '../component/paragraph'
import OfferLayout from '../component/offer-layout'
import ConfigModelList from '../component/config-model-list'
import Icon from '../component/icon'
import Tooltip from '../component/tooltip'
import Notification from '../component/notification'

import warningIcon from '../../asset/icon/warning.svg'

const SCROLL_CONTAINER_ID = 'main-container'

const MaterialPage = ({
  selectedState,
  setSelectedState,
  goToUpload,
  openModelViewer,
  modelsWithConfig,
  selectedModelConfigIds,
  toggleId,
  toggleAll,
  duplicateModelConfig,
  updateQuantities,
  deleteModelConfigs,
  processedModelConfigIds,
  setProcessedModelConfigIds,
  updateSelectedModelConfigs,
  unconfiguredModelConfigIds,
  configuredModelConfigIds,
  quotes,
  isPollingDone,
  modelConfigs
}) => {
  const breakpoints = useBreakpoints()
  const [sidebarOpen, setSidebarOpen] = useState()

  const renderModelsWithConfig = () =>
    modelsWithConfig
      .filter(([modelConfig]) => !processedModelConfigIds.includes(modelConfig.id))
      .map(([modelConfig, model]) => {
        let lowAmountOfVendors = false
        let noQuotes = false

        if (isPollingDone) {
          const numberOfVendorsWithQuotes = uniq(
            quotes.filter(quote => quote.modelId === model.modelId).map(quote => quote.vendorId)
          ).length

          if (numberOfVendorsWithQuotes < config.lowAmountOfVendorsThreshold) {
            lowAmountOfVendors = true
          }

          if (numberOfVendorsWithQuotes === 0) {
            noQuotes = true
          }
        }

        return (
          <UploadModelItem
            configured={modelConfig.quoteId}
            s
            classNames={['u-margin-bottom']}
            key={modelConfig.id}
            imageSource={model.thumbnailUrl}
            title={model.fileName}
            subline={formatDimensions(model.dimensions, model.fileUnit)}
            onPreviewImageClick={() => openModelViewer(model)}
            buttonsLeft={
              <NumberField
                value={modelConfig.quantity}
                onChange={quantity => updateQuantities([modelConfig.id], quantity)}
              />
            }
            buttonsRight={
              <ButtonBar>
                <Button icon={zoomInIcon} iconOnly onClick={() => openModelViewer(model)} />
                <Button
                  icon={copyIcon}
                  iconOnly
                  onClick={() => {
                    duplicateModelConfig(modelConfig.id).then(({payload: {nextId}}) => {
                      updateSelectedModelConfigs([...selectedModelConfigIds, nextId])
                    })
                  }}
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
            warning={
              noQuotes ? (
                <Tooltip content="This model has issues! We did not receive any price quotes for this model. Possible issues may be: A problem with the file format or the size of the model is ether too small or too big to print.">
                  <Button icon={warningIcon} iconOnly error />
                </Tooltip>
              ) : (
                lowAmountOfVendors && (
                  <Tooltip content="This model has issues! We received an unusual low amount of offers. Possible issues may be: A problem with the file format or the size of the model is ether too small or too big to print.">
                    <Button icon={warningIcon} iconOnly warning />
                  </Tooltip>
                )
              )
            }
          />
        )
      })

  const sidebar = asideNode => (
    <>
      <Section>
        <Headline
          light
          label={`Your selection (${selectedModelConfigIds.length}/${
            unconfiguredModelConfigIds.length
          } files)`}
        />
        <Paragraph>
          <Link
            onClick={event => {
              event.preventDefault()
              toggleAll()
            }}
            label={
              unconfiguredModelConfigIds.length === selectedModelConfigIds.length
                ? 'Deselect all files'
                : 'Select all files'
            }
          />
        </Paragraph>
        <ConfigModelList
          withCartLinkAnimation={breakpoints.desktop}
          onConfigurationChanged={() => {
            asideNode.scrollTop = 0
          }}
          onConfigurationDidChange={() => {
            setProcessedModelConfigIds(configuredModelConfigIds)
          }}
        >
          {renderModelsWithConfig()}
        </ConfigModelList>
      </Section>
    </>
  )

  const modelIds = modelConfigs
    .filter(modelConfig => selectedModelConfigIds.includes(modelConfig.id))
    .map(modelConfig => modelConfig.modelId)

  const numberOfModels = modelIds.length
  const numberOfModelsWithQuotes = modelIds
    .map(modelId => quotes.filter(quote => quote.modelId === modelId).length)
    .reduce((acc, numberOfQuotes) => (numberOfQuotes === 0 ? acc : acc + 1), 0)

  const someModelsAreWithoutQuotes = numberOfModels > numberOfModelsWithQuotes && isPollingDone

  const modelConfigIdsWithoutQuotes = modelConfigs
    .filter(modelConfig => selectedModelConfigIds.includes(modelConfig.id))
    .map(modelConfig => [
      quotes.filter(quote => quote.modelId === modelConfig.modelId).length,
      modelConfig.id
    ])
    .reduce(
      (acc, [numberOfQuotes, modelConfigId]) =>
        numberOfQuotes > 0 ? acc : [...acc, modelConfigId],
      []
    )

  return (
    <ToolLayout
      isOpen={breakpoints.desktop || sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      fullMain
      scrollContainerId={SCROLL_CONTAINER_ID}
      sidebar={sidebar}
    >
      <OfferLayout
        footer={
          <OfferFooterPartial
            onOpenSidebar={() => setSidebarOpen(true)}
            configIds={selectedModelConfigIds}
            selectedState={selectedState}
          />
        }
      >
        <Section>
          <Link
            label="Back to upload"
            href="#"
            icon={<Icon source={backIcon} />}
            onClick={event => {
              event.preventDefault()
              goToUpload({selectModelConfigIds: selectedModelConfigIds})
            }}
          />
          {someModelsAreWithoutQuotes && (
            <Notification
              classNames={['u-margin-top']}
              message={
                numberOfModels === 1
                  ? `Unfortunately, we weren't able to retrieve offers for the selected model. In order to receive prices you have to upload you model again, using a valid file format.`
                  : `Unfortunately, we weren't able to retrieve offers for ${numberOfModels -
                      numberOfModelsWithQuotes} of your ${numberOfModels} selected models. Please ensure that your uploaded models are using a valid file format and that model dimensions are neither too small nor too large.`
              }
              type="error"
              button={
                <Button
                  label="Remove"
                  onClick={() => {
                    deleteModelConfigs(modelConfigIdsWithoutQuotes)
                  }}
                  compact
                  minor
                />
              }
            />
          )}
        </Section>
        <MaterialPartial
          configIds={selectedModelConfigIds}
          scrollContainerId={SCROLL_CONTAINER_ID}
          selectedState={selectedState}
          onChange={setSelectedState}
        />
      </OfferLayout>
    </ToolLayout>
  )
}

const mapStateToProps = state => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  modelsWithConfig: unzip([state.core.modelConfigs, selectModelsOfModelConfigs(state)]).filter(
    ([modelConfig]) => modelConfig.type === 'UPLOADED'
  ),
  currency: state.core.currency,
  location: state.core.location,
  uploadedModelConfigs: selectUploadedModelConfigs(state),
  cartCount: selectCartCount(state),
  modelConfigs: state.core.modelConfigs,
  unconfiguredModelConfigIds: selectUnconfiguredModelConfigIds(state),
  configuredModelConfigIds: selectConfiguredModelConfigIds(state),
  quotes: selectQuotes(state),
  isPollingDone: selectIsPollingDone(state)
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  openModelViewer: modelViewerAction.open,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  clearSelectedModelConfigs: modelAction.clearSelectedModelConfigs,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  updateQuantities: modelAction.updateQuantities,
  duplicateModelConfig: modelAction.duplicateModelConfig,
  openModelWithoutQuote: modalAction.openModelWithoutQuoteModal
}

export default compose(
  withProps(({location}) => ({
    configIds: (location.state && location.state.configIds) || []
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    toggleId: ({updateSelectedModelConfigs, selectedModelConfigIds}) => id => {
      if (selectedModelConfigIds.includes(id)) {
        updateSelectedModelConfigs(selectedModelConfigIds.filter(item => item !== id))
      } else {
        updateSelectedModelConfigs([...selectedModelConfigIds, id])
      }
    },
    toggleAll: ({
      updateSelectedModelConfigs,
      unconfiguredModelConfigIds,
      selectedModelConfigIds
    }) => () => {
      if (unconfiguredModelConfigIds.length === selectedModelConfigIds.length) {
        updateSelectedModelConfigs([])
      } else {
        updateSelectedModelConfigs(unconfiguredModelConfigIds)
      }
    }
  }),
  withState('selectedState', 'setSelectedState', {
    materialGroupId: null,
    materialId: null,
    finishGroupId: null,
    materialConfigId: null
  }),
  withState(
    'processedModelConfigIds',
    'setProcessedModelConfigIds',
    ({configuredModelConfigIds}) => configuredModelConfigIds
  ),
  lifecycle({
    componentWillMount() {
      const {configIds, uploadedModelConfigs, updateSelectedModelConfigs, goToUpload} = this.props
      const allModelConfigIds = uploadedModelConfigs.map(modelConfig => modelConfig.id)
      const filteredModelConfigIds = intersection(allModelConfigIds, configIds)

      if (filteredModelConfigIds.length > 0) {
        updateSelectedModelConfigs(filteredModelConfigIds)
      } else {
        goToUpload()
      }
    },
    componentDidUpdate(_prevProps) {
      const {modelsWithConfig, goToUpload} = this.props

      if (modelsWithConfig.length === 0) {
        goToUpload()
      }
    }
  })
)(MaterialPage)
