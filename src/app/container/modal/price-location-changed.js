import React from 'react'

import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import RichText from '../../component/rich-text'
import Button from '../../component/button'

import {getCountryName} from '../../service/country'

import {goToCart} from '../../action/navigation'

import {connectLegacy} from '../util/connect-legacy'

const PriceLocationChangedModal = ({oldShippingAddress, newShippingAddress, onClose}) => {
  const headline = <Headline label="Prices have changed" modifiers={['l', 'warning']} />
  const buttons = [<Button label="OK" onClick={() => onClose()} />]

  return (
    <Overlay headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <RichText>
        <p>
          We used the location
          <strong>
            {' '}
            {oldShippingAddress.city}, {getCountryName(oldShippingAddress.countryCode)}{' '}
          </strong>
          to calculate prices. You have entered
          <strong>
            {' '}
            {newShippingAddress.city}, {getCountryName(newShippingAddress.countryCode)}{' '}
          </strong>
          as your shipping address.
        </p>
      </RichText>
      <RichText>
        <p>
          Please double check the prices on the order summary or go back to find the best deal for
          your new location.
        </p>
      </RichText>
    </Overlay>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onClose: goToCart
}

export default connectLegacy(mapStateToProps, mapDispatchToProps)(PriceLocationChangedModal)
