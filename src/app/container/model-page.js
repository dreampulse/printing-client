import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import ConfigurationHeader from 'Component/configuration-header'
import LabeledField from 'Component/labeled-field'
import LocationField from 'Component/location-field'
import NumberField from 'Component/number-field'

import AppLayout from 'Container/app-layout'
import UploadSection from 'Container/upload-section'
import MaterialSection from 'Container/material-section'
import ProviderSection from 'Container/provider-section'

import {changeQuantity} from 'Action/model'
import {updateLocation} from 'Action/user'

import {selectCommonQuantity} from 'Lib/selector'
import {formatAddress} from 'Lib/formatter'
import {convertPlaceToLocation} from 'Lib/geolocation'

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

export default compose(connect(mapStateToProps, mapDispatchToProps))(ModelPage)
