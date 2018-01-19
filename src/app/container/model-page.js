import React from 'react'
import {compose} from 'recompose'

import ConfigurationHeader from '../component/configuration-header'
import LabeledField from '../component/labeled-field'
import LocationField from '../component/location-field'
import NumberField from '../component/number-field'
import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import SplitLayout from '../component/split-layout'
import Headline from '../component/headline'
import Baloon from '../component/baloon'
import FeatureParagraph from '../component/feature-paragraph'
import Image from '../component/image'
import SelectField from '../component/select-field'
import SelectMenu from '../component/select-menu'

import AppLayout from '../container/app-layout'
import UploadSection from '../container/upload-section'
import MaterialSection from '../container/material-section'
import FinishSection from '../container/finish-section'
import ProviderSection from '../container/provider-section'

import {changeQuantity} from '../action/model'
import {updateLocation, updateCurrency} from '../action/user'

import {selectCommonQuantity} from '../lib/selector'
import {formatAddress} from '../lib/formatter'
import {convertPlaceToLocation} from '../lib/geolocation'

// TODO: Use final svg images here!
import feature1Image from '../../asset/image/feature1.png'
import feature2Image from '../../asset/image/feature2.png'
// import feature3Image from '../../../asset/image/feature3.png'

import {connectLegacy} from './util/connect-legacy'
import config from '../../../config'

const ModelPage = ({
  address,
  currency,
  commonQuantity,
  onChangeQuantity,
  onUpdateLocation,
  onUpdateCurrency,
  models
}) => {
  const currencies = config.currencies
  const selectedCurrencyValue = currencies.find(({value}) => value === currency)
  const currencyMenu = <SelectMenu values={currencies} />

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

  const renderPromotionSection = () => [
    <Section key={0}>
      <Headline
        label="Save up to 70% on industrial grade 3D printing"
        modifiers={['l', 'light']}
        classNames={['u-margin-bottom-xxl']}
      />
      <SplitLayout
        leftContent={[
          <FeatureParagraph key="feature1" image={<Image src={feature1Image} />}>
            Compare offers from the top providers and order instantly
          </FeatureParagraph>,
          <FeatureParagraph key="feature2" image={<Image src={feature2Image} />}>
            The widest material choice and the fastest delivery
          </FeatureParagraph>
          /*
            <FeatureParagraph key="feature3" image={feature3Image}>
              Split your order accross multiple providers, effortlessly
            </FeatureParagraph>
            */
        ]}
        rightContent={[
          <Baloon key="baloon1">
            Impossible! My favorite printing service is always the cheapest.
          </Baloon>,
          <Baloon key="baloon2" modifiers={['right']}>
            Not Always! Prices vary hugely based on model and material. Here you will always find
            the best deal.
          </Baloon>
        ]}
      />
    </Section>,
    <ProviderTeaser key={1}>
      <ProviderImage name="shapeways" />
      <ProviderImage name="imaterialise" />
      <ProviderImage name="sculpteo" />
    </ProviderTeaser>
  ]

  return (
    <AppLayout currentStep={0} configurationHeader={configurationHeader}>
      <UploadSection />
      <MaterialSection />
      <FinishSection />
      <ProviderSection />
      {models.length === 0 && renderPromotionSection()}
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  address: state.user.user.shippingAddress,
  currency: state.user.currency,
  models: state.model.models,
  commonQuantity: selectCommonQuantity(state)
})

const mapDispatchToProps = {
  onChangeQuantity: changeQuantity,
  onUpdateLocation: updateLocation,
  onUpdateCurrency: updateCurrency
}

export default compose(connectLegacy(mapStateToProps, mapDispatchToProps))(ModelPage)
