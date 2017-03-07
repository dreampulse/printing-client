import React from 'react'

import Button from 'Component/button'
import Overlay from 'Component/overlay'
import Headline from 'Component/headline'

const headline = <Headline label="Warning Headline" modifiers={['l']} />
const buttons = [
  <Button label="Cancel" modifiers={['text']} />,
  <Button label="OK" />
]

const ShippingAddressModal = () => (
  <Overlay headline={headline} buttons={buttons} closePortal={() => { console.log('close') }}>
    Please enter your shipping address
  </Overlay>
)

export default ShippingAddressModal
