import React from 'react'
import {chain as flatMap} from 'ramda'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import ConfigurationHeader from 'Component/configuration-header'
import LabeledField from 'Component/labeled-field'
import LocationField from 'Component/location-field'
import NumberField from 'Component/number-field'
import Section from 'Component/section'

import config from '../../../config'

import AppLayout from './app-layout'
import UploadSection from './upload-section'
import MaterialSection from './material-section'

import Button from '../component-legacy/button'
import SectionHeadline from '../component-legacy/section-headline'
import Table from '../component-legacy/table'
import TableHeadCell from '../component-legacy/table-head-cell'
import TableRow from '../component-legacy/table-row'
import TableCell from '../component-legacy/table-cell'

import {goToVendor} from '../action/navigation'
import {selectOffer} from '../action/cart'

import {getPriceAmount} from '../lib/get-total-amount'

const ModelPage = ({
  selectedMaterial,
  location,
  price,
  onSelectOffer
}) => {
  const configurationHeader = (
    <ConfigurationHeader>
      <LabeledField label="Shipping:" modifiers={['block']}>
        <LocationField googleMapsApiKey={config.googleMapsApiKey} />
      </LabeledField>
      <LabeledField label="Quantity:">
        <NumberField />
      </LabeledField>
    </ConfigurationHeader>
  )

  const ShippingSection = () => (
    <section>
      <SectionHeadline label="Shipping to" />
      {location && <pre>{JSON.stringify(location, null, 2)}</pre>}
    </section>
  )

  const PriceTable = () => {
    const vendors = Object.keys(price.printingService)
      .map(name => ({name, ...price.printingService[name]}))

    const offers = flatMap(vendor =>
      vendor.shipping.map(shipping => ({
        name: vendor.name,
        items: vendor.items.filter((_, index) =>
          price.items[index].materialId === selectedMaterial
        ),
        shipping,
        vatPercentage: vendor.vatPercentage,
        currency: vendor.currency
      })), vendors
    )

    return (
      <Table
        head={[
          <TableHeadCell key={0}>Provider</TableHeadCell>,
          <TableHeadCell key={1}>Price incl. shipping</TableHeadCell>,
          <TableHeadCell key={2}>Shipping option</TableHeadCell>
        ]}
        rows={offers.map((offer, index) =>
          <TableRow key={index}>
            <TableCell>{offer.name}</TableCell>
            <TableCell>{getPriceAmount(offer)} {offer.currency}</TableCell>
            <TableCell>{offer.shipping.name}</TableCell>
            <TableCell classNames={['u-align-right']}>
              <Button
                label="Select"
                onClick={() =>
                  onSelectOffer({
                    vendor: offer.name,
                    shippingName: offer.shipping.name
                  })
                }
              />
            </TableCell>
          </TableRow>
        )}
      />
    )
  }

  const PriceSection = () => (
    <Section>
      <SectionHeadline label="Prices" />
      {selectedMaterial && <PriceTable /> }
    </Section>
  )

  return (
    <AppLayout currentStep={0} configurationHeader={configurationHeader}>
      <UploadSection />
      <MaterialSection />
      <ShippingSection />
      <PriceSection />
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  selectedMaterial: state.material.selectedMaterial,
  location: state.user.user.shippingAddress,
  price: state.price.price
})

const mapDispatchToProps = {
  onGoToVendor: goToVendor,
  onSelectOffer: selectOffer
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ModelPage)
