import React from 'react'
import {connect} from 'react-redux'
import {compose, withState} from 'recompose'

import Button from 'Component/button'
import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import LocationField from 'Component/location-field'

import {formatAddress} from 'Lib/formatter'
import {isAddressValid, convertPlaceToLocation} from 'Lib/geolocation'

import {updateLocation} from 'Action/user'
import {close} from 'Action/modal'

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
  connect(mapStateToProps, mapDispatchToProps),
  withState('address', 'setAddress', props => props.address)
)(ShippingAddressModal)
