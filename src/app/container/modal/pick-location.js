// @flow

import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import compact from 'lodash/compact'

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

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'

import config from '../../../../config'

const PickLocationModal = ({
  location,
  setLocation,
  currency,
  setCurrency,
  onUpdateLocation,
  onUpdateCurrency,
  closeModal,
  meta
}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies} />

  const headline = <Headline label="Shipping address required" modifiers={['l']} />
  const headlineWarning = <Headline label="Warning" modifiers={['l', 'warning']} />

  const buttons = [
    meta.isCloseable && (
      <Button
        key="close"
        label="Cancel"
        modifiers={compact([!meta.showWarning && 'text'])}
        onClick={() => closeModal()}
      />
    ),
    <Button
      label="OK"
      key="ok"
      modifiers={compact([meta.showWarning && 'text'])}
      disabled={!isLocationValid(location) || !currency}
      onClick={() => {
        onUpdateLocation(location, true)
        onUpdateCurrency(currency, true)
        closeModal()
      }}
    />
  ]

  return (
    <Overlay
      headline={meta.showWarning ? headlineWarning : headline}
      buttons={compact(buttons)}
      closeable={false}
    >
      {meta.showWarning ? (
        <Paragraph>
          If you change your country or currency you have to reconfigure all models.
        </Paragraph>
      ) : (
        <Paragraph>We need your address and currency to calculate the shipping prices.</Paragraph>
      )}
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
  closeModal: modalActions.closeModal
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('location', 'setLocation', props => props.globalLocation),
  withState('currency', 'setCurrency', props => props.globalCurrency)
)(PickLocationModal)
