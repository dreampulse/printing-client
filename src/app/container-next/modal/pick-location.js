// @flow

import React from 'react'
import {connect} from 'react-redux'
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

import {formatLocation} from '../../lib/formatter'
import {isLocationValid, convertPlaceToLocation} from '../../lib/geolocation'

import * as modalActions from '../../action-next/modal'
import * as coreActions from '../../action-next/core'

import config from '../../../../config'

const PickLocationModal = ({
  location,
  setLocation,
  currency,
  setCurrency,
  onUpdateLocation,
  onUpdateCurrency,
  onClose
}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies} />

  const headline = <Headline label="Shipping address required" modifiers={['l']} />
  const buttons = [
    <Button
      label="OK"
      disabled={!isLocationValid(location) || !currency}
      onClick={() => {
        onUpdateLocation(location)
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
            value={location ? formatLocation(location) : ''}
            googleMapsApiKey={config.googleMapsApiKey}
            onChange={place => {
              setLocation(convertPlaceToLocation(place))
            }}
          />
        </Column>
        <Column sm={3}>
          <SelectField
            menu={currencyMenu}
            value={selectedCurrencyValue}
            disabled={!isLocationValid(location)}
            onChange={({value}) => setCurrency(value)}
          />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = state => ({
  globalLocation: state.core.location,
  globalCurrency: state.core.currency
})

const mapDispatchToProps = {
  onUpdateLocation: coreActions.updateLocation,
  onUpdateCurrency: coreActions.updateCurrency,
  onClose: modalActions.close
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('location', 'setLocation', props => props.globalLocation),
  withState('currency', 'setCurrency', props => props.globalCurrency)
)(PickLocationModal)
