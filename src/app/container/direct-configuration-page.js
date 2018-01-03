import React from 'react'
import {compose} from 'recompose'
import {getCurrencies} from '../lib/currency'

import {selectMaterialByMaterialConfigId, selectPrintingServiceRequests} from '../lib/selector'
import {getBestOfferForMaterialConfig} from '../lib/material'
import {formatDimensions, formatPrice, formatDeliveryTime, formatAddress} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {convertPlaceToLocation} from '../lib/geolocation'

import {openMaterialModal} from '../action/modal'
import {selectMaterialConfig} from '../action/material'
import {selectOffer} from '../action/price'
import {goToAddress} from '../action/navigation'
import {updateLocation, updateCurrency} from '../action/user'

import ConfigurationHeader from '../component/configuration-header'
import LabeledField from '../component/labeled-field'
import LocationField from '../component/location-field'
import SidebarLayout from '../component/sidebar-layout'
import PageHeader from '../component/page-header'
import ModelQuantityItem from '../component/model-quantity-item'
import ModelQuantityItemList from '../component/model-quantity-item-list'
import MaterialCard from '../component/material-card'
import Info from '../component/info'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'
import Price from '../component/price'
import SelectField from '../component/select-field'
import SelectMenu from '../component/select-menu'

import AppLayout from './app-layout'
import {connectLegacy} from './util/connect-legacy'
import config from '../../../config'

const DirectConfigurationPage = ({
  address,
  currency,
  models,
  selectedMaterial,
  offers,
  printingServiceRequests,
  onOpenMaterialModal,
  onSelectMaterialConfig,
  onSelectOffer,
  onGoToAddress,
  onUpdateLocation,
  onUpdateCurrency
}) => {
  const {finishGroup, materialConfig} = selectedMaterial
  const colorValues = finishGroup.materialConfigs
    // Filter out material configs which do not have an offer
    .filter(filterConfig => Boolean(getBestOfferForMaterialConfig(offers, filterConfig.id)))
    .map(({id, color, colorCode, colorImage}) => ({
      value: id,
      colorValue: colorCode,
      label: color,
      colorImage: colorImage ? getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill']) : undefined
    }))
  // Only select an offer if price request completed!
  const bestOffer =
    printingServiceRequests &&
    printingServiceRequests.complete === printingServiceRequests.total &&
    getBestOfferForMaterialConfig(offers, materialConfig.id)
  const selectedColorValue = colorValues.find(({value}) => value === materialConfig.id)

  const colorMenu = colorValues.length > 1 ? <SelectMenu values={colorValues} /> : undefined
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
        The delivery time is an approximate summary of production time and shipping time. Please
        note that some materials may have a longer production time.
      </Paragraph>
      <Paragraph>Plastics: 2-8 days</Paragraph>
      <Paragraph>Metals: 6-15 days</Paragraph>
      <Paragraph>Other materials: 6-15 days</Paragraph>
    </Info>
  )

  const materialSection = (
    <MaterialCard
      key={finishGroup.name}
      title={finishGroup.name}
      subline={finishGroup.materialName}
      shipping={(bestOffer && formatDeliveryTime(bestOffer.shipping.deliveryTime)) || undefined}
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
        (bestOffer &&
          (() => {
            onSelectOffer(bestOffer)
            onGoToAddress()
          })) ||
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

  const currencies = getCurrencies()
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies || []} />
  const configurationHeader = (
    <ConfigurationHeader>
      <LabeledField label="Shipping:" modifiers={['block']}>
        <LocationField
          value={formatAddress(address)}
          googleMapsApiKey={config.googleMapsApiKey}
          onChange={place => onUpdateLocation(convertPlaceToLocation(place))}
        />
        <SelectField
          menu={currencyMenu}
          value={selectedCurrencyValue}
          disabled={!address.countryCode}
          onChange={({value}) => onUpdateCurrency(value)}
        />
      </LabeledField>
    </ConfigurationHeader>
  )

  return (
    <AppLayout currentStep={0} configurationHeader={configurationHeader}>
      <PageHeader label="My Shopping Cart" />
      <SidebarLayout sidebar={materialSection}>
        <ModelQuantityItemList classNames={['u-no-margin']}>
          {models.map(model => (
            <ModelQuantityItem
              key={model.fileId}
              imageSource={model.thumbnailUrl}
              quantity={model.quantity}
              title={model.fileName}
              subline={formatDimensions(model.dimensions, model.fileUnit)}
            />
          ))}
        </ModelQuantityItemList>
      </SidebarLayout>
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  address: state.user.user.shippingAddress,
  currency: state.user.currency,
  models: state.model.models,
  offers: state.price.offers || [],
  selectedMaterial: selectMaterialByMaterialConfigId(state, state.material.selectedMaterialConfig),
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onOpenMaterialModal: openMaterialModal,
  onSelectMaterialConfig: selectMaterialConfig,
  onSelectOffer: selectOffer,
  onGoToAddress: goToAddress,
  onUpdateLocation: updateLocation,
  onUpdateCurrency: updateCurrency
}

export default compose(connectLegacy(mapStateToProps, mapDispatchToProps))(DirectConfigurationPage)
