import React from 'react'
import {compose, withState} from 'recompose'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import LocationField from '../../component/location-field'
import Grid from '../../component/grid'
import Column from '../../component/column'
import SelectField from '../../component/select-field'
import SelectMenu from '../../component/select-menu'

import {formatAddress} from '../../lib/formatter'
import {isAddressValid, convertPlaceToLocation} from '../..//lib/geolocation'

import {updateLocation, updateCurrency} from '../../action/user'
import {close} from '../../action/modal'

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
  const currencies = config.currencies
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
            }}
          />
        </Column>
        <Column sm={3}>
          <SelectField
            menu={currencyMenu}
            value={selectedCurrencyValue}
            disabled={!isAddressValid(address)}
            onChange={({value}) => setCurrency(value)}
          />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = state => ({
  address: state.user.user.shippingAddress,
  currency: state.user.currency
})

const mapDispatchToProps = {
  onUpdateLocation: updateLocation,
  onUpdateCurrency: updateCurrency,
  onClose: close
}

export default compose(
  connectLegacy(mapStateToProps, mapDispatchToProps),
  withState('address', 'setAddress', props => props.address),
  withState('currency', 'setCurrency', props => props.currency)
)(ShippingAddressModal)
