import React from 'react'
import {connect} from 'react-redux'

import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import RichText from 'Component/rich-text'
import Button from 'Component/button'

import {getCountryName} from 'Service/country'

import {goToCart} from 'Action/navigation'

const PriceChangedModal = ({oldShippingAddress, newShippingAddress, onClose}) => {
  const headline = <Headline label="Prices have changed" modifiers={['l', 'warning']} />
  const buttons = [
    <Button label="OK" onClick={() => onClose()} />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <RichText>
        <p>
          We used the location
          <strong>
            {' '}{oldShippingAddress.city}, {getCountryName(oldShippingAddress.countryCode)}{' '}
          </strong>
          to calculate prices. You have entered
          <strong>
            {' '}{newShippingAddress.city}, {getCountryName(oldShippingAddress.countryCode)}{' '}
          </strong>
          as your shipping address.
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
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onClose: goToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceChangedModal)
