import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import compact from 'lodash/compact'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import LocationField from '../../component/location-field'
import Grid from '../../component/grid'
import Column from '../../component/column'
import SelectField from '../../component/select-field'
import SelectMenu from '../../component/select-menu'

import {formatLocation} from '../../lib/formatter'
import {isLocationValid, convertPlaceToLocation} from '../../lib/geolocation'
import {getValidCurrency} from '../../lib/currency'

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
  meta,
  hasQuotes
}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies} />

  const headline = <Headline label="Shipping address required" size="l" />
  const headlineWarning = <Headline label="Warning" size="l" warning />

  const buttons = [
    meta.isCloseable && (
      <Button key="close" label="Cancel" text={!hasQuotes} onClick={() => closeModal()} />
    ),
    <Button
      label="OK"
      key="ok"
      text={hasQuotes}
      disabled={!isLocationValid(location) || !currency}
      onClick={() => {
        onUpdateLocation(location, true)
        onUpdateCurrency(currency, true)
        closeModal()
      }}
    />
  ]

  return (
    <Modal
      headline={hasQuotes ? headlineWarning : headline}
      buttons={compact(buttons)}
      onClose={meta.isCloseable ? () => closeModal() : undefined}
    >
      {hasQuotes ? (
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
              const nextLocation = convertPlaceToLocation(place)
              setLocation(nextLocation)

              if (isLocationValid(nextLocation) && !currency) {
                setCurrency(getValidCurrency(nextLocation.countryCode))
              }
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
    </Modal>
  )
}

const mapStateToProps = state => ({
  globalLocation: state.core.location,
  globalCurrency: state.core.currency,
  hasQuotes: !!state.core.modelConfigs.find(modelConfig => modelConfig.quoteId)
})

const mapDispatchToProps = {
  onUpdateLocation: coreActions.updateLocation,
  onUpdateCurrency: coreActions.updateCurrency,
  closeModal: modalActions.closeModal
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('location', 'setLocation', props => props.globalLocation),
  withState('currency', 'setCurrency', props => props.globalCurrency)
)(PickLocationModal)
