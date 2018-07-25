// @flow

import React from 'react'
import {connect} from 'react-redux'

import config from '../../../config'
import {formatLocation} from '../lib/formatter'
import {convertPlaceToLocation} from '../lib/geolocation'
import * as coreAction from '../action-next/core'
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
            value={formatLocation(location)}
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
  currency: state.core.currency,
  location: state.core.location
})

const mapDispatchToProps = {
  onUpdateLocation: coreAction.updateLocation,
  onUpdateCurrency: coreAction.updateCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationHeaderPartial)
