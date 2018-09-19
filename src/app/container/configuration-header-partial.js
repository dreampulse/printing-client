// @flow

import React from 'react'
import {connect} from 'react-redux'

import config from '../../../config'
import {formatLocation} from '../lib/formatter'
import {convertPlaceToLocation} from '../lib/geolocation'
import * as coreAction from '../action/core'
import type {AppState} from '../reducer'

import ConfigurationHeader from '../component/configuration-header'
import LocationField from '../component/location-field'
import SelectField from '../component/select-field'
import SelectMenu from '../component/select-menu'

const ConfigurationHeaderPartial = ({currency, location, updateLocation, updateCurrency}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies} />

  return (
    <ConfigurationHeader
      location={
        <LocationField
          value={location ? formatLocation(location) : ''}
          googleMapsApiKey={config.googleMapsApiKey}
          onChange={place => updateLocation(convertPlaceToLocation(place))}
        />
      }
      currency={
        <SelectField
          menu={currencyMenu}
          value={selectedCurrencyValue}
          disabled={!(location && location.countryCode)}
          onChange={({value}) => updateCurrency(value)}
        />
      }
      text="Printing and shipping prices depend on your location"
    />
  )
}
const mapStateToProps = (state: AppState) => ({
  currency: state.core.currency,
  location: state.core.location
})

const mapDispatchToProps = {
  updateLocation: coreAction.updateLocation,
  updateCurrency: coreAction.updateCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationHeaderPartial)
