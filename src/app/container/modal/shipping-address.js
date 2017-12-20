import React from 'react'
import {compose, withState} from 'recompose'
import {getCurrencies, getCurrencyForCountry} from 'Service/currency'

import Button from 'Component/button'
import Overlay from 'Component/overlay'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import LocationField from 'Component/location-field'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'

import {formatAddress} from 'Lib/formatter'
import {isAddressValid, convertPlaceToLocation} from 'Lib/geolocation'

import {updateLocation, updateCurrency} from 'Action/user'
import {close} from 'Action/modal'

import {connectLegacy} from '../util/connect-legacy'

import config from '../../../../config'

const ShippingAddressModal = ({
  address,
  setAddress,
  currency,
  setCurrency,
  onUpdateLocation,
  onUpdateCurrency,
  onClose
}) => {
  const currencies = getCurrencies()
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies || []} />

  const headline = <Headline label="Shipping address required" modifiers={['l']} />
  const buttons = [
    <Button
      label="OK"
      disabled={!isAddressValid(address) || !currency}
      onClick={() => {
        onUpdateLocation(address)
        onUpdateCurrency(currency)
        onClose()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph>We need your address and currency to calculate the shipping prices</Paragraph>
      <Grid>
        <Column sm={9}>
          <LocationField
            value={formatAddress(address)}
            googleMapsApiKey={config.googleMapsApiKey}
            onChange={place => {
              const location = convertPlaceToLocation(place)
              setAddress(location)
              setCurrency(getCurrencyForCountry(location.countryCode))
            }}
          />
        </Column>
        <Column sm={3}>
          <SelectField
            menu={currencyMenu}
            value={selectedCurrencyValue}
            disabled={!isAddressValid(address)}
            onChange={({value}) => setCurrency(value)}
            modifiers={['currency']}
          />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = state => ({
  address: state.user.user.shippingAddress
})

const mapDispatchToProps = {
  onUpdateLocation: updateLocation,
  onUpdateCurrency: updateCurrency,
  onClose: close
}

export default compose(
  connectLegacy(mapStateToProps, mapDispatchToProps),
  withState('address', 'setAddress', props => props.address),
  withState('currency', 'setCurrency', props => getCurrencyForCountry(props.address.countryCode))
)(ShippingAddressModal)
