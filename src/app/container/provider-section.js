import React from 'react'
import {compose} from 'recompose'

import {buildClassArray} from '../lib/build-class-name'
import {
  selectOffersForSelectedMaterialConfig,
  selectMaterialByMaterialConfigId
} from '../lib/selector'
import {getProviderName} from '../lib/provider-selector'
import {formatPrice, formatDeliveryTime, formatTimeRange} from '../lib/formatter'

import Section from '../component/section'
import Headline from '../component/headline'
import ProviderList from '../component/provider-list'
import ProviderItem from '../component/provider-item'
import Button from '../component/button'

import {selectOffer} from '../action/price'
import {goToAddress} from '../action/navigation'
import {createConfiguration} from '../action/configuration'

import {connectLegacy} from './util/connect-legacy'
import {getFeatures} from './util/feature'

const ProviderSection = ({
  configurationId,
  selectedMaterialConfig,
  offers,
  onSelectOffer,
  onGoToAddress,
  onCreateConfiguration,
  features,
  state
}) => {
  const disabled = !selectedMaterialConfig || !offers
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled
  })

  const getOfferProcess = offer => {
    const {
      finishGroup: {properties: {printingMethodShort = ''}}
    } = selectMaterialByMaterialConfigId(state, offer.materialConfigId)
    return printingMethodShort
  }

  const getProviderInfo = offer => {
    const {
      finishGroup: {properties: {printingServiceName = []}}
    } = selectMaterialByMaterialConfigId(state, offer.materialConfigId)
    return printingServiceName[offer.printingService] || ''
  }

  const getProductionTime = offer => {
    const {materialConfig: {printingService}} = selectMaterialByMaterialConfigId(
      state,
      offer.materialConfigId
    )
    const {productionTimeFast, productionTimeSlow} = printingService[offer.printingService]
    return [productionTimeFast, productionTimeSlow]
  }

  const renderProviderList = () => (
    <ProviderList>
      {offers.sort((a, b) => a.totalPrice > b.totalPrice).map(offer => (
        <ProviderItem
          key={offer.offerId}
          process={getOfferProcess(offer)}
          providerSlug={offer.printingService}
          providerName={getProviderName(offer.printingService)}
          providerInfo={getProviderInfo(offer)}
          price={formatPrice(offer.subTotalPrice, offer.currency)}
          deliveryTime={formatDeliveryTime(offer.shipping.deliveryTime)}
          deliveryProvider={offer.shipping.name}
          shippingPrice={formatPrice(offer.shipping.price, offer.currency)}
          totalPrice={formatPrice(offer.totalPrice, offer.currency)}
          includesVat={Boolean(offer.vatPrice)}
          productionTime={formatTimeRange(...getProductionTime(offer))}
          onCheckoutClick={() => {
            onSelectOffer(offer)
            onGoToAddress()
          }}
        />
      ))}
    </ProviderList>
  )

  return (
    <Section id="section-provider">
      <Headline label="4. Choose a provider and shipping option" modifiers={headlineModifiers} />
      {!disabled && renderProviderList()}
      {features.share &&
        !disabled &&
        !configurationId && (
          <Button
            label="Share selection"
            modifiers={['text']}
            classNames={['u-float-right']}
            onClick={() => onCreateConfiguration(true)}
          />
        )}
    </Section>
  )
}

const mapStateToProps = state => ({
  configurationId: state.configuration.configurationId,
  selectedMaterialConfig: state.material.selectedMaterialConfig,
  offers: selectOffersForSelectedMaterialConfig(state),
  state
})

const mapDispatchToProps = {
  onSelectOffer: selectOffer,
  onGoToAddress: goToAddress,
  onCreateConfiguration: createConfiguration
}

export default compose(getFeatures, connectLegacy(mapStateToProps, mapDispatchToProps))(
  ProviderSection
)
