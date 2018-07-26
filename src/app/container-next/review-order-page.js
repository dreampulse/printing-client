import React from 'react'
import {compose} from 'recompose'
import compact from 'lodash/compact'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {getStateName, getCountryName} from '../service/country'
import {openIntercom} from '../service/intercom'
import {formatPrice} from '../lib/formatter'

import PageHeader from '../component/page-header'
import SidebarLayout from '../component/sidebar-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Button from '../component/button'
import EditLink from '../component/edit-link'
import Grid from '../component/grid'
import Column from '../component/column'
import Paragraph from '../component/paragraph'
import PaymentSection from '../component/payment-section'
import CheckoutModelList from '../component/checkout-model-list'
import ModelItem from '../component/model-item'
import SelectField from '../component/select-field'

import creditCardIcon from '../../asset/icon/credit-card.svg'
import paypalIcon from '../../../src/asset/icon/paypal.svg'

// TODO: import {guard} from './util/guard'
import {getFeatures} from './util/feature'
import CheckoutLayout from './checkout-layout'

const ReviewOrderPage = ({address, onPush}) => {
  const shippingStateName = getStateName(
    address.shippingAddress.countryCode,
    address.shippingAddress.stateCode
  )
  const billingStateName =
    getStateName(address.shippingAddress.countryCode, address.billingAddress.stateCode) ||
    shippingStateName

  const AddressSection = () => (
    <Section>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Shipping Address" />
          <Paragraph modifiers={['l']}>
            {address.companyName ? (
              <span>
                {address.companyName}
                <br />
              </span>
            ) : null}
            {address.vatId ? (
              <span>
                {address.vatId}
                <br />
              </span>
            ) : null}
            {address.shippingAddress.firstName} {address.shippingAddress.lastName}
            <br />
            {address.shippingAddress.address}
            <br />
            {address.shippingAddress.addressLine2}
            <br />
            {address.shippingAddress.zipCode} {address.shippingAddress.city}
            <br />
            {shippingStateName && (
              <span>
                {shippingStateName}
                <br />
              </span>
            )}
            {getCountryName(address.shippingAddress.countryCode)}
            <br />
            <EditLink label="edit" onClick={() => onPush('/address')} />
          </Paragraph>
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Billing Address" />
          <Paragraph modifiers={['l']}>
            {address.companyName ? (
              <span>
                {address.companyName}
                <br />
              </span>
            ) : null}
            {address.vatId ? (
              <span>
                {address.vatId}
                <br />
              </span>
            ) : null}
            {address.billingAddress.firstName || address.shippingAddress.firstName}{' '}
            {address.billingAddress.lastName || address.shippingAddress.lastName}
            <br />
            {address.billingAddress.address || address.shippingAddress.address}
            <br />
            {address.billingAddress.addressLine2 || address.shippingAddress.addressLine2}
            <br />
            {address.billingAddress.zipCode || address.shippingAddress.zipCode}{' '}
            {address.billingAddress.city || address.shippingAddress.city}
            <br />
            {billingStateName && (
              <span>
                {billingStateName}
                <br />
              </span>
            )}
            {address.billingAddress.countryCode
              ? getCountryName(address.billingAddress.countryCode)
              : getCountryName(address.shippingAddress.countryCode)}
            <br />
            <EditLink label="edit" onClick={() => onPush('/address')} />
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const paymentButtons = compact([
    <Button key="payment1" modifiers={['block']} icon={creditCardIcon} label="Credit card" />,
    <Button key="payment2" modifiers={['block']} icon={paypalIcon} label="Paypal" />
  ])

  const paymentSection = (
    <PaymentSection
      subtotal={formatPrice(5400, 'EUR')}
      shippings={[{label: 'i.materialize', price: '$5.00€'}, {label: 'shapeways', price: '$5.30€'}]}
      shippingPrice={formatPrice(4900, 'EUR')}
      shippingName="fast shipping"
      vat={formatPrice(500, 'EUR')}
      total={formatPrice(4599, 'EUR')}
      onContactLinkClick={event => {
        openIntercom()
        event.preventDefault()
      }}
    >
      {paymentButtons}
    </PaymentSection>
  )

  return (
    <CheckoutLayout title="Checkout" currentStep={2}>
      <PageHeader label="Review Order" />
      <SidebarLayout sidebar={paymentSection}>
        <AddressSection />
        <Headline
          tag="strong"
          modifiers={['minor', 'l', 'inline']}
          label={
            <React.Fragment>
              Your Order <EditLink label="edit" onClick={() => onPush('/cart')} />
            </React.Fragment>
          }
        />
        <CheckoutModelList>
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
        </CheckoutModelList>
      </SidebarLayout>
    </CheckoutLayout>
  )
}

const mapStateToProps = () => ({
  address: {
    shippingAddress: {
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Address line one',
      addressLine2: 'Address line two',
      zipCode: 'ZIP 1111',
      city: 'City',
      countryCode: 'DE',
      companyName: 'Company Name',
      vatId: 'DEVAT_ID',
      stateCode: ''
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      addressLine2: '',
      zipCode: '',
      city: '',
      countryCode: '',
      companyName: '',
      vatId: '',
      stateCode: ''
    }
  }
})

const mapDispatchToProps = {
  onPush: push
}

const enhance = compose(
  // TODO: guard(state => state.cart.cart),
  getFeatures,
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(ReviewOrderPage)
