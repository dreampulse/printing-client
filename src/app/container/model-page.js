import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import ConfigurationHeader from 'Component/configuration-header'
import LabeledField from 'Component/labeled-field'
import LocationField from 'Component/location-field'
import NumberField from 'Component/number-field'

import config from '../../../config'

import AppLayout from './app-layout'
import UploadSection from './upload-section'
import MaterialSection from './material-section'
import ProviderSection from './provider-section'

const ModelPage = ({
  location
}) => {
  const configurationHeader = (
    <ConfigurationHeader>
      <LabeledField label="Shipping:" modifiers={['block']}>
        <LocationField
          value={`${location.zipCode} ${location.city}, ${location.stateCode}, ${location.countryCode}`}
          googleMapsApiKey={config.googleMapsApiKey}
        />
      </LabeledField>
      <LabeledField label="Quantity:">
        <NumberField value={1} />
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
  location: state.user.user.shippingAddress
})

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ModelPage)
