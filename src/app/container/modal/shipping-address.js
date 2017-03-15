import React from 'react'

import Button from 'Component/button'
import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import LocationField from 'Component/location-field'

import config from '../../../../config'

const headline = <Headline label="Shipping address required" modifiers={['l']} />
const buttons = [
  <Button label="OK" disabled />
]

const ShippingAddressModal = () => (
  <Overlay headline={headline} buttons={buttons} closeable={false}>
    <Paragraph>We need your address to calculate the shipping prices</Paragraph>
    <LocationField
      value=""
      googleMapsApiKey={config.googleMapsApiKey}
    />
  </Overlay>
)

export default ShippingAddressModal
