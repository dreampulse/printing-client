import React from 'react'
import {compose} from 'recompose'

import {buildClassArray} from '../lib/build-class-name'
import {selectOffersForSelectedMaterialConfig} from '../lib/selector'
import {formatPrice, formatShipping} from '../lib/formatter'

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
  features
}) => {
  const disabled = !selectedMaterialConfig || !offers
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled
  })

  const renderProviderList = () => (
    <ProviderList>
      {offers.sort((a, b) => a.totalPrice > b.totalPrice).map(offer => (
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
  offers: selectOffersForSelectedMaterialConfig(state)
})

const mapDispatchToProps = {
  onSelectOffer: selectOffer,
  onGoToAddress: goToAddress,
  onCreateConfiguration: createConfiguration
}

export default compose(getFeatures, connectLegacy(mapStateToProps, mapDispatchToProps))(
  ProviderSection
)
