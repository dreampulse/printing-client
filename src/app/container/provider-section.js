import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {buildClassArray} from 'Lib/build-class-name'
import {selectOffersForSelectedMaterialConfig, selectMaterialByMaterialConfigId} from 'Lib/selector'
import {formatPrice, formatDeliveryTime} from 'Lib/formatter'

import Section from 'Component/section'
import Headline from 'Component/headline'
import ProviderList from 'Component/provider-list'
import ProviderItem from 'Component/provider-item'
import Button from 'Component/button'
import Info from 'Component/info'
import Paragraph from 'Component/paragraph'

import {selectOffer} from 'Action/price'
import {goToAddress} from 'Action/navigation'
import {createConfiguration} from 'Action/configuration'

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
    const {material: {properties: {printingMethodShort = ''}}} = selectMaterialByMaterialConfigId(
      state,
      offer.materialConfigId
    )
    return printingMethodShort
  }

  const getProviderInfo = offer => {
    const {material: {properties: {printingServiceName = []}}} = selectMaterialByMaterialConfigId(
      state,
      offer.materialConfigId
    )
    return (
      <Info modifiers={['minor']}>
        <Headline modifiers={['s']} label={`${offer.printingService} calls this material:`} />
        <Paragraph>{printingServiceName[offer.printingService] || 'unknown'}</Paragraph>
      </Info>
    )
  }

  const renderProviderList = () => (
    <ProviderList>
      {offers.sort((a, b) => a.totalPrice > b.totalPrice).map(offer => (
        <ProviderItem
          key={offer.offerId}
          process={getOfferProcess(offer)}
          provider={offer.printingService}
          providerInfo={getProviderInfo(offer)}
          price={formatPrice(
            offer.subTotalPrice + offer.vatPrice,
            offer.currency,
            offer.priceEstimated
          )}
          deliveryTime={formatDeliveryTime(offer.shipping.deliveryTime)}
          deliveryProvider={offer.shipping.name}
          shipping={formatPrice(offer.shipping.price, offer.currency)}
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
      <Headline label="3. Choose a provider and shipping option" modifiers={headlineModifiers} />
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

export default compose(getFeatures, connect(mapStateToProps, mapDispatchToProps))(ProviderSection)
