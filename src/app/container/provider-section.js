import React from 'react'
import {chain as flatMap} from 'ramda'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {buildClassArray} from 'Lib/build-class-name'
import {getPriceAmount} from 'Lib/get-total-amount'

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
      price={`${getPriceAmount(offer)} ${offer.currency}`}
      shipping={`${offer.shipping.name} (${offer.shipping.deliveryTime} Days)`}
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

// TODO: put this into a lib
function getOffers (price, materialConfigId) {
  if (!price) {
    return []
  }

  const vendors = Object.keys(price.printingService)
    .map(name => ({name, ...price.printingService[name]}))

  const offers = flatMap(vendor =>
    vendor.shipping.map(shipping => ({
      name: vendor.name,
      items: vendor.items.filter((_, index) =>
        price.items[index].materialId === materialConfigId
      ),
      shipping,
      vatPercentage: vendor.vatPercentage,
      currency: vendor.currency
    })), vendors
  )

  return offers
}

const mapStateToProps = state => ({
  selectedMaterialConfig: state.material.selectedMaterialConfig,
  offers: getOffers(state.price.price, state.material.selectedMaterialConfig)
})

const mapDispatchToProps = {
  onSelectOffer: selectOffer
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ProviderSection)
