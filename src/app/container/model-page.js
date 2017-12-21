import React from 'react'
import {compose} from 'recompose'
import {getCurrencies} from '../service/currency'

import ConfigurationHeader from '../component/configuration-header'
import LabeledField from '../component/labeled-field'
import LocationField from '../component/location-field'
import NumberField from '../component/number-field'
import SelectField from '../component/select-field'
import SelectMenu from '../component/select-menu'

import AppLayout from '../container/app-layout'
import UploadSection from '../container/upload-section'
import MaterialSection from '../container/material-section'
import ProviderSection from '../container/provider-section'

import {changeQuantity} from '../action/model'
import {updateLocation, updateCurrency} from '../action/user'

import {selectCommonQuantity} from '../lib/selector'
import {formatAddress} from '../lib/formatter'
import {convertPlaceToLocation} from '../lib/geolocation'

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
