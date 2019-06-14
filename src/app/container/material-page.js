import React from 'react'
import {connect} from 'react-redux'
import unzip from 'lodash/unzip'
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

import {formatDimensions} from '../lib/formatter'
import {
  selectUploadedModelConfigs,
  selectCartCount,
  selectModelsOfModelConfigs
} from '../lib/selector'

import MaterialPartial from './material-partial'
import OfferFooterPartial from './offer-footer-partial'
import LocationInfoPartial from './location-info-partial'

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

const SCROLL_CONTAINER_ID = 'main-container'

const getConfiguredModelIds = modelConfigs =>
  modelConfigs.filter(model => model.quoteId).map(model => model.id)

const MaterialPage = ({
  selectedState,
  setSelectedState,
  goToUpload,
  uploadedModelConfigs,
  openModelViewer,
  modelsWithConfig,
  selectedModelConfigIds,
  toggleId,
  toggleAll,
  duplicateModelConfig,
  updateQuantities,
  deleteModelConfigs,
  initialConfigIds,
  setInitialConfigIds,
  modelConfigs
}) => {
  const sidebar = asideNode => (
    <>
      <Section>
        <Link
          label="Back to upload"
          href="#"
          icon={backIcon}
          onClick={event => {
            event.preventDefault()
            goToUpload()
          }}
        />
      </Section>
      <Section>
        <Headline
          modifiers={['light']}
          label={`Your selection (${selectedModelConfigIds.length}/${
            uploadedModelConfigs.length
          } files)`}
        />
        <Paragraph>
          <Link
            onClick={event => {
              event.preventDefault()
              toggleAll()
            }}
            label={
              modelsWithConfig.length === selectedModelConfigIds.length
                ? 'Deselect all files'
                : 'Select all files'
            }
          />
        </Paragraph>
        <ConfigModelList
          onConfigurationChanged={() => {
            asideNode.scrollTop = 0
          }}
          onConfigurationDidChange={() => {
            setInitialConfigIds(getConfiguredModelIds(modelConfigs))
          }}
        >
          {modelsWithConfig
            .filter(([modelConfig]) => !initialConfigIds.includes(modelConfig.id))
            .map(([modelConfig, model]) => (
              <UploadModelItem
                configured={modelConfig.quoteId}
                s
                classNames={['u-margin-bottom']}
                key={modelConfig.id}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
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
              />
            ))}
        </ConfigModelList>
      </Section>
    </>
  )

  return (
    <ToolLayout fullMain scrollContainerId={SCROLL_CONTAINER_ID} sidebar={sidebar}>
      <OfferLayout
        footer={
          <OfferFooterPartial configIds={selectedModelConfigIds} selectedState={selectedState} />
        }
      >
        <Section>
          <LocationInfoPartial />
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
  modelConfigs: state.core.modelConfigs
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  openModelViewer: modelViewerAction.open,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  clearSelectedModelConfigs: modelAction.clearSelectedModelConfigs,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  updateQuantities: modelAction.updateQuantities,
  duplicateModelConfig: modelAction.duplicateModelConfig
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
    toggleAll: ({updateSelectedModelConfigs, modelsWithConfig, selectedModelConfigIds}) => () => {
      if (modelsWithConfig.length === selectedModelConfigIds.length) {
        updateSelectedModelConfigs([])
      } else {
        updateSelectedModelConfigs(modelsWithConfig.map(([modelConfig]) => modelConfig.id))
      }
    }
  }),
  withState('selectedState', 'setSelectedState', {
    materialGroupId: null,
    materialId: null,
    finishGroupId: null,
    materialConfigId: null
  }),
  withState('initialConfigIds', 'setInitialConfigIds', ({modelConfigs}) =>
    getConfiguredModelIds(modelConfigs)
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
    componentDidUpdate() {
      if (this.props.modelsWithConfig.length === 0) {
        this.props.goToUpload()
      }
    }
  })
)(MaterialPage)
