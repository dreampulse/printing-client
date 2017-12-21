import React from 'react'
import {compose} from 'recompose'

import ConfigurationHeader from '../component/configuration-header'
import LabeledField from '../component/labeled-field'
import LocationField from '../component/location-field'
import NumberField from '../component/number-field'

import AppLayout from '../container/app-layout'
import UploadSection from '../container/upload-section'
import MaterialSection from '../container/material-section'
import ProviderSection from '../container/provider-section'

import {changeQuantity} from '../action/model'
import {updateLocation} from '../action/user'

import {selectCommonQuantity} from '../lib/selector'
import {formatAddress} from '../lib/formatter'
import {convertPlaceToLocation} from '../lib/geolocation'

import {connectLegacy} from './util/connect-legacy'
import config from '../../../config'

const ModelPage = ({address, commonQuantity, onChangeQuantity, onUpdateLocation}) => {
  const configurationHeader = (
    <ConfigurationHeader>
      <LabeledField label="Shipping:" modifiers={['block']}>
        <LocationField
          value={formatAddress(address)}
          googleMapsApiKey={config.googleMapsApiKey}
          onChange={place => onUpdateLocation(convertPlaceToLocation(place))}
        />
      </LabeledField>
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
  commonQuantity: selectCommonQuantity(state)
})

const mapDispatchToProps = {
  onChangeQuantity: changeQuantity,
  onUpdateLocation: updateLocation
}

export default compose(connectLegacy(mapStateToProps, mapDispatchToProps))(ModelPage)
