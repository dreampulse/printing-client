import React from 'react'
import {compose} from 'recompose'
import {getCurrencies} from 'Service/currency'

import ConfigurationHeader from 'Component/configuration-header'
import LabeledField from 'Component/labeled-field'
import LocationField from 'Component/location-field'
import NumberField from 'Component/number-field'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'

import AppLayout from 'Container/app-layout'
import UploadSection from 'Container/upload-section'
import MaterialSection from 'Container/material-section'
import ProviderSection from 'Container/provider-section'

import {changeQuantity} from 'Action/model'
import {updateLocation, updateCurrency} from 'Action/user'

import {selectCommonQuantity} from 'Lib/selector'
import {formatAddress} from 'Lib/formatter'
import {convertPlaceToLocation} from 'Lib/geolocation'

import {connectLegacy} from './util/connect-legacy'
import config from '../../../config'

const ModelPage = ({
  address,
  currency,
  commonQuantity,
  onChangeQuantity,
  onUpdateLocation,
  onUpdateCurrency
}) => {
  const currencies = getCurrencies()
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies || []} />

  const configurationHeader = (
    <ConfigurationHeader>
      <LabeledField label="Shipping:" modifiers={['block']}>
        <LocationField
          value={formatAddress(address)}
          googleMapsApiKey={config.googleMapsApiKey}
          onChange={place => onUpdateLocation(convertPlaceToLocation(place))}
        />
      </LabeledField>
      <SelectField
        menu={currencyMenu}
        value={selectedCurrencyValue}
        disabled={!address.countryCode}
        onChange={({value}) => onUpdateCurrency(value)}
        modifiers={['currency']}
      />
      <LabeledField label="Quantity:">
        <NumberField
          disabled={commonQuantity === undefined}
          value={commonQuantity}
          onChange={value => onChangeQuantity({quantity: value})}
        />
      </LabeledField>
    </ConfigurationHeader>
  )

  return (
    <AppLayout currentStep={0} configurationHeader={configurationHeader}>
      <UploadSection />
      <MaterialSection />
      <ProviderSection />
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  address: state.user.user.shippingAddress,
  currency: state.user.currency,
  commonQuantity: selectCommonQuantity(state)
})

const mapDispatchToProps = {
  onChangeQuantity: changeQuantity,
  onUpdateLocation: updateLocation,
  onUpdateCurrency: updateCurrency
}

export default compose(connectLegacy(mapStateToProps, mapDispatchToProps))(ModelPage)
