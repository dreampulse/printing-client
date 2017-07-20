import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {
  selectMaterialByMaterialConfigId,
  selectPrintingServiceRequests
} from 'Lib/selector'
import {getBestOfferForMaterialConfig} from 'Lib/material'
import {
  formatDimensions,
  formatPrice,
  formatDeliveryTime
} from 'Lib/formatter'
import getCloudinaryUrl from 'Lib/cloudinary'

import {openMaterialModal} from 'Action/modal'
import {selectMaterialConfig} from 'Action/material'
import {selectOffer} from 'Action/price'
import {goToAddress} from 'Action/navigation'

import SidebarLayout from 'Component/sidebar-layout'
import PageHeader from 'Component/page-header'
import ModelQuantityItem from 'Component/model-quantity-item'
import ModelQuantityItemList from 'Component/model-quantity-item-list'
import MaterialCard from 'Component/material-card'
import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import Price from 'Component/price'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'

import AppLayout from './app-layout'

const DirectConfigurationPage = ({
  models,
  selectedMaterial,
  offers,
  printingServiceRequests,
  onOpenMaterialModal,
  onSelectMaterialConfig,
  onSelectOffer,
  onGoToAddress
}) => {
  const {
    finishGroup,
    materialConfig
  } = selectedMaterial
  const colorValues = finishGroup.materialConfigs
    // Filter out material configs which do not have an offer
    .filter(config => (
      Boolean(getBestOfferForMaterialConfig(offers, config.id))
    ))
    .map(({id, color, colorCode, colorImage}) => ({
      value: id,
      colorValue: colorCode,
      label: color,
      colorImage: colorImage ? getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill']) : undefined
    }))
  // Only select an offer if price request completed!
  const bestOffer = printingServiceRequests &&
    printingServiceRequests.complete === printingServiceRequests.total &&
    getBestOfferForMaterialConfig(
      offers,
      materialConfig.id
    )
  const selectedColorValue = colorValues.find(({value}) => (
    value === materialConfig.id
  ))

  const colorMenu = colorValues.length > 1 ? (<SelectMenu values={colorValues} />) : undefined
  const materialPrice = (
    <Price
      value={
        bestOffer
        ? formatPrice(bestOffer.totalPrice, bestOffer.currency, bestOffer.priceEstimated)
        : undefined
      }
      meta="incl. tax & shipping"
    />
  )
  const colorSelect = (
    <SelectField
      modifiers={['compact']}
      menu={colorMenu}
      value={selectedColorValue}
      onChange={({value}) => onSelectMaterialConfig(value)}
    />
  )
  const info = (
    <Info>
      <Headline modifiers={['s']} label="Delivery Time" />
      <Paragraph>
        The delivery time is an approximate summary of  production time and shipping time.
      </Paragraph>
    </Info>
  )

  const materialSection = (
    <MaterialCard
      key={finishGroup.name}
      title={finishGroup.name}
      subline={finishGroup.materialName}
      shipping={bestOffer && formatDeliveryTime(bestOffer.shipping.deliveryTime) || undefined}
      description={finishGroup.summary}
      price={materialPrice}
      info={info}
      colorSelect={colorSelect}
      loading={!bestOffer}
      selectLabel="Checkout"
      unavailable={
        !bestOffer &&
        printingServiceRequests &&
        printingServiceRequests.complete === printingServiceRequests.total
      }
      onSelectClick={
        bestOffer &&
        (() => {
          onSelectOffer(bestOffer)
          onGoToAddress()
        }) ||
        undefined
      }
      onMoreClick={() => {
        onOpenMaterialModal({
          materialId: selectedMaterial.material.id,
          finishGroupId: selectedMaterial.finishGroup.id
        })
      }}
    />
  )

  return (
    <AppLayout currentStep={0}>
      <PageHeader label="Shared Compilation" />
      <SidebarLayout sidebar={materialSection}>
        <ModelQuantityItemList classNames={['u-no-margin']}>
          {models.map(model => (
            <ModelQuantityItem
              key={model.fileId}
              imageSource={model.thumbnailUrl}
              quantity={model.quantity}
              title={model.fileName}
              subline={formatDimensions(
                model.dimensions,
                model.fileUnit
              )}
            />
          ))}
        </ModelQuantityItemList>
      </SidebarLayout>
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  models: state.model.models,
  offers: state.price.offers || [],
  selectedMaterial: selectMaterialByMaterialConfigId(state, state.material.selectedMaterialConfig),
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onOpenMaterialModal: openMaterialModal,
  onSelectMaterialConfig: selectMaterialConfig,
  onSelectOffer: selectOffer,
  onGoToAddress: goToAddress
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(DirectConfigurationPage)
