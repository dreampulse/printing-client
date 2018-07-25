// @flow

import React from 'react'
import {connect} from 'react-redux'

import config from '../../../config'
import {formatAddress} from '../lib/formatter'
import {convertPlaceToLocation} from '../lib/geolocation'
import * as userAction from '../action-next/user'
import type {AppState} from '../reducer-next'

import ConfigurationHeader from '../component/configuration-header'
import LabeledField from '../component/labeled-field'
import LocationField from '../component/location-field'
import SelectField from '../component/select-field'
import SelectMenu from '../component/select-menu'

const ConfigurationHeaderPartial = ({currency, location, onUpdateLocation, onUpdateCurrency}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies} />

  return (
    <ConfigurationHeader
      location={
        <LabeledField label="Shipping:" modifiers={['block']}>
          <LocationField
            value={formatAddress(location)}
            googleMapsApiKey={config.googleMapsApiKey}
            onChange={place => onUpdateLocation(convertPlaceToLocation(place))}
          />
        </LabeledField>
      }
      currency={
        <SelectField
          menu={currencyMenu}
          value={selectedCurrencyValue}
          disabled={!(location && location.countryCode)}
          onChange={({value}) => onUpdateCurrency(value)}
        />
      }
      text="Printing and shipping prices depend on your location"
    />
  )
}
const mapStateToProps = (state: AppState) => ({
  currency: state.user.currency,
  location: state.user.location
})

const mapDispatchToProps = {
  onUpdateLocation: userAction.locationUpdated,
  onUpdateCurrency: userAction.currencyUpdated
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationHeaderPartial)
