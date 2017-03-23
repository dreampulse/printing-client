import React from 'react'

import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import RichText from 'Component/rich-text'
import Button from 'Component/button'

const headline = <Headline label="Prices have changed" modifiers={['l', 'warning']} />
const buttons = [
  <Button label="OK" disabled />
]
// TODO: dispatch(goToCart()) on click

const FetchingPriceModal = ({oldShippingAddress, newShippingAddress}) => (
  <Overlay headline={headline} buttons={buttons} closeable={false}>
    <RichText>
      <p>
        We used the location <strong>{oldShippingAddress}</strong> to calculate prices.
        You have entered <strong>{newShippingAddress}</strong> as your shipping address.
      </p>
    </RichText>
    <RichText>
      <p>
        Please double check the prices on the order summary or go
        back to find the best deal for your new location.
      </p>
    </RichText>
  </Overlay>
)

export default FetchingPriceModal
