import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {buildClassArray} from 'Lib/build-class-name'
import {selectOffersForSelectedMaterialConfig} from 'Lib/selector'
import {
  formatPrice,
  formatShipping
} from 'Lib/formatter'

import Section from 'Component/section'
import Headline from 'Component/headline'
import ProviderList from 'Component/provider-list'
import ProviderItem from 'Component/provider-item'
import Button from 'Component/button'

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
  features
}) => {
  const disabled = !selectedMaterialConfig || !offers
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled
  })

  const renderProviderList = () => (
    <ProviderList>
      {
        offers
        .sort((a, b) => a.totalPrice > b.totalPrice)
        .map(offer => (
          <ProviderItem
            key={offer.offerId}
            provider={offer.printingService}
            price={formatPrice(offer.totalPrice, offer.currency, offer.priceEstimated)}
            shipping={formatShipping(offer.shipping)}
            onCheckoutClick={() => {
              onSelectOffer(offer)
              onGoToAddress()
            }}
          />
        ))
      }
    </ProviderList>
  )

  return (
    <Section id="section-provider">
      <Headline label="3. Choose a provider and shipping option" modifiers={headlineModifiers} />
      {!disabled && renderProviderList()}
      {features.share && !disabled && !configurationId && (
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
  offers: selectOffersForSelectedMaterialConfig(state)
})

const mapDispatchToProps = {
  onSelectOffer: selectOffer,
  onGoToAddress: goToAddress,
  onCreateConfiguration: createConfiguration
}

export default compose(
  getFeatures,
  connect(mapStateToProps, mapDispatchToProps)
)(ProviderSection)
