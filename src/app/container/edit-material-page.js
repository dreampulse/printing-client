import React, {useState} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withState from 'recompose/withState'
import unzip from 'lodash/unzip'

import * as navigationAction from '../action/navigation'
import * as modelViewerAction from '../action/model-viewer'
import * as modelAction from '../action/model'

import backIcon from '../../asset/icon/back.svg'
import zoomInIcon from '../../asset/icon/zoom-in.svg'

import {formatDimensions} from '../lib/formatter'
import {selectModelsOfModelConfigs, selectCommonMaterialPathOfModelConfigs} from '../lib/selector'
import {guard} from './util/guard'

import MaterialPartial from './material-partial'
import OfferFooterPartial from './offer-footer-partial'

import Headline from '../component/headline'
import Section from '../component/section'
import ToolLayout from '../component/tool-layout'
import Link from '../component/link'
import Button from '../component/button'
import ButtonBar from '../component/button-bar'
import UploadModelItem from '../component/upload-model-item'
import NumberField from '../component/number-field'
import OfferLayout from '../component/offer-layout'
import Icon from '../component/icon'

const SCROLL_CONTAINER_ID = 'main-container'

const EditMaterialPage = ({
  goToCart,
  modelsWithConfig,
  configIds,
  openModelViewer,
  updateQuantities,
  selectedState,
  setSelectedState
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebar = () => (
    <>
      <Section classNames={['u-no-margin']}>
        <Headline
          light
          label={`Your selection (${modelsWithConfig.length} ${
            modelsWithConfig.length > 1 ? 'files' : 'file'
          })`}
        />
        {modelsWithConfig.map(([modelConfig, model]) => (
          <UploadModelItem
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
              </ButtonBar>
            }
          />
        ))}
      </Section>
    </>
  )

  return (
    <ToolLayout
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      fullMain
      scrollContainerId={SCROLL_CONTAINER_ID}
      sidebar={sidebar()}
    >
      <OfferLayout
        footer={
          <OfferFooterPartial
            onOpenSidebar={() => setSidebarOpen(true)}
            configIds={configIds}
            selectedState={selectedState}
          />
        }
      >
        <Section>
          <Link
            label="Back to cart"
            icon={<Icon source={backIcon} />}
            onClick={event => {
              event.preventDefault()
              goToCart({
                selectModelConfigIds: configIds
              })
            }}
          />
        </Section>
        <MaterialPartial
          isEditMode
          configIds={configIds}
          scrollContainerId={SCROLL_CONTAINER_ID}
          selectedState={selectedState}
          onChange={setSelectedState}
        />
      </OfferLayout>
    </ToolLayout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  modelsWithConfig: unzip([state.core.modelConfigs, selectModelsOfModelConfigs(state)]).filter(
    ([modelConfig]) =>
      modelConfig.type !== 'UPLOADED' || ownProps.configIds.includes(modelConfig.id)
  ),
  currency: state.core.currency,
  location: state.core.location,
  commonMaterialPath: selectCommonMaterialPathOfModelConfigs(state, ownProps.configIds)
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  openModelViewer: modelViewerAction.open,
  updateQuantities: modelAction.updateQuantities
}

export default compose(
  withProps(({location}) => ({
    configIds: (location.state && location.state.configIds) || []
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('selectedState', 'setSelectedState', ({commonMaterialPath}) => ({
    materialGroupId: commonMaterialPath.materialGroupId,
    materialId: commonMaterialPath.materialId,
    finishGroupId: commonMaterialPath.finishGroupId,
    materialConfigId: commonMaterialPath.materialConfigId
  })),
  guard(props => props.modelsWithConfig.length > 0)
)(EditMaterialPage)
