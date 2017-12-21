import React from 'react'
import {compose, withState} from 'recompose'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import LocationField from '../../component/location-field'

import {formatAddress} from '../../lib/formatter'
import {isAddressValid, convertPlaceToLocation} from '../..//lib/geolocation'

import {updateLocation} from '../../action/user'
import {close} from '../../action/modal'

import {connectLegacy} from '../util/connect-legacy'

import config from '../../../../config'

const ShippingAddressModal = ({address, setAddress, onUpdateLocation, onClose}) => {
  const headline = <Headline label="Shipping address required" modifiers={['l']} />
  const buttons = [
    <Button
      label="OK"
      disabled={!isAddressValid(address)}
      onClick={() => {
        onUpdateLocation(address)
        onClose()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph>We need your address to calculate the shipping prices</Paragraph>
      <LocationField
        value={formatAddress(address)}
        googleMapsApiKey={config.googleMapsApiKey}
        onChange={place => setAddress(convertPlaceToLocation(place))}
      />
    </Overlay>
  )
}

const mapStateToProps = state => ({
  address: state.user.user.shippingAddress
})

const mapDispatchToProps = {
  onUpdateLocation: updateLocation,
  onClose: close
}

export default compose(
  connectLegacy(mapStateToProps, mapDispatchToProps),
  withState('address', 'setAddress', props => props.address)
)(ShippingAddressModal)
