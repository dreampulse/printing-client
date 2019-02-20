import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import unzip from 'lodash/unzip'

import * as navigationAction from '../action/navigation'
import * as modelViewerAction from '../action/model-viewer'
import * as modelAction from '../action/model'

import backIcon from '../../asset/icon/back.svg'
import cartIcon from '../../asset/icon/cart.svg'
import helpIcon from '../../asset/icon/help.svg'
import zoomInIcon from '../../asset/icon/zoom-in.svg'

import {formatDimensions} from '../lib/formatter'
import {selectCartCount, selectModelsOfModelConfigs} from '../lib/selector'
import {scrollToTop} from './util/scroll-to-top'
import {openIntercom} from '../service/intercom'
import {guard} from './util/guard'

import MaterialPartial from './material-partial'
import LocationInfoPartial from './location-info-partial'

import NavBar from '../component/nav-bar'
import Headline from '../component/headline'
import Section from '../component/section'
import ToolLayout from '../component/tool-layout'
import Logo from '../component/logo'
import IconLink from '../component/icon-link'
import Link from '../component/link'
import Button from '../component/button'
import ButtonBar from '../component/button-bar'
import UploadModelItem from '../component/upload-model-item'
import NumberField from '../component/number-field'

const SCROLL_CONTAINER_ID = 'main-container'

const EditMaterialPage = ({
  goToCart,
  goToUpload,
  modelsWithConfig,
  configIds,
  cartCount,
  openModelViewer,
  updateQuantities
}) => {
  const sidebar = () => (
    <>
      <Section>
        <Link
          label="Back to cart"
          href="#"
          icon={backIcon}
          onClick={event => {
            event.preventDefault()
            goToCart()
          }}
        />
      </Section>
      <Section classNames={['u-no-margin']}>
        <Headline
          modifiers={['s']}
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
      scrollContainerId={SCROLL_CONTAINER_ID}
      header={
        <NavBar
          leftContent={<Logo onClick={() => goToUpload()} />}
          rightContent={
            <>
              <IconLink
                icon={cartIcon}
                disabled={cartCount < 1}
                cartCount={cartCount}
                onClick={event => {
                  event.preventDefault()
                  goToCart()
                }}
              />
              <IconLink
                icon={helpIcon}
                onClick={event => {
                  event.preventDefault()
                  openIntercom()
                }}
              />
            </>
          }
        />
      }
      sidebar={sidebar()}
    >
      <Section>
        <LocationInfoPartial />
      </Section>
      <MaterialPartial isEditMode configIds={configIds} scrollContainerId={SCROLL_CONTAINER_ID} />
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
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  goToCart: navigationAction.goToCart,
  openModelViewer: modelViewerAction.open,
  updateQuantities: modelAction.updateQuantities
}

export default compose(
  scrollToTop(),
  guard(props => props.modelsWithConfig.length > 0),
  withProps(({location}) => ({
    configIds: (location.state && location.state.configIds) || []
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditMaterialPage)
