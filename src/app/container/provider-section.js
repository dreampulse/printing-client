import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {buildClassArray} from 'Lib/build-class-name'
import {getOfferAmount} from 'Lib/price'
import {selectOffers} from 'Lib/selector'
import {
  formatPrice,
  formatShipping
} from 'Lib/formatter'

import Section from 'Component/section'
import Headline from 'Component/headline'
import Info from 'Component/info'
import Paragraph from 'Component/paragraph'
import ProviderList from 'Component/provider-list'
import ProviderItem from 'Component/provider-item'

import {selectOffer} from 'Action/cart'

const ProviderSection = ({
  selectedMaterialConfig,
  offers,
  onSelectOffer
}) => {
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled: !selectedMaterialConfig
  })

  const providerInfo = (
    <Info>
      <Headline modifiers={['s']} label="TODO Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Info>
  )

  const providers = offers.map((offer, index) => (
    <ProviderItem
      key={index}
      provider={offer.name}
      price={formatPrice(getOfferAmount(offer), offer.currency)}
      shipping={formatShipping(offer.shipping)}
      onCheckoutClick={() =>
        onSelectOffer({
          vendor: offer.name,
          shippingName: offer.shipping.name
        })
      }
    />
  ))

  return (
    <Section id="section-provider">
      <Headline label="3. Choose a provider and shipping option" modifiers={headlineModifiers} />
      {Boolean(selectedMaterialConfig) && (
        <ProviderList providerInfo={providerInfo}>
          {providers}
        </ProviderList>
      )}
    </Section>
  )
}

const mapStateToProps = state => ({
  selectedMaterialConfig: state.material.selectedMaterialConfig,
  offers: selectOffers(state)
})

const mapDispatchToProps = {
  onSelectOffer: selectOffer
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ProviderSection)
