import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'

import {updateUser} from '../action/user'
import {goBack} from '../action/navigation'

const Address = ({
  handleSubmit,
  onGoBack
}) => {
  const TextInput = ({label, name, type}) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} component="input" type={type || 'text'} />
    </div>
  )

  const CheckBox = ({label, name}) => (
    <span>
      {label}
      <Field name={name} component="input" type="checkbox" />
    </span>
  )

  const ContactDataSection = () => (
    <section>
      <SectionHeadline label="Contact data" />
      <TextInput label="Email address" name="emailAddress" type="email" />
      <TextInput label="Phone number" name="phoneNumber" />
      <TextInput label="Currency" name="currency" />
      <CheckBox label="Company" name="isCompany" />
      <TextInput label="VAT ID" name="vatId" />
    </section>
  )

  const ShippingAddressSection = () => (
    <section>
      <SectionHeadline label="Shipping address" />
      <TextInput label="First name" name="shippingAddress.firstName" />
      <TextInput label="Last name" name="shippingAddress.lastName" />
      <TextInput label="Street" name="shippingAddress.street" />
      <TextInput label="House number" name="shippingAddress.houseNumber" />
      <TextInput label="Address line 2" name="shippingAddress.addressLine2" />
      <TextInput label="City" name="shippingAddress.city" />
      <TextInput label="Zip code" name="shippingAddress.zipCode" />
      <TextInput label="State code" name="shippingAddress.stateCode" />
      <TextInput label="Country code" name="shippingAddress.countryCode" />
    </section>
  )

  const BillingAddressSection = () => (
    <section>
      <SectionHeadline label="Billing address" />
      <TextInput label="First name" name="billingAddress.firstName" />
      <TextInput label="Last name" name="billingAddress.lastName" />
      <TextInput label="Street" name="billingAddress.street" />
      <TextInput label="House number" name="billingAddress.houseNumber" />
      <TextInput label="Address line 2" name="billingAddress.addressLine2" />
      <TextInput label="City" name="billingAddress.city" />
      <TextInput label="Zip code" name="billingAddress.zipCode" />
      <TextInput label="State code" name="billingAddress.stateCode" />
      <TextInput label="Country code" name="billingAddress.countryCode" />
    </section>
  )

  const AddressForm = () => (
    <form onSubmit={handleSubmit}>
      <ContactDataSection />
      <ShippingAddressSection />
      <BillingAddressSection />
      <Button type="submit" label="Continue" />
    </form>
  )

  return (
    <Main>
      <Headline label="Enter your details" modifiers={['xl']} />
      <Button style={{position: 'absolute', right: '250px', top: '25px'}} label="Back" onClick={onGoBack} />
      <AddressForm />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.user.user
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onSubmit: updateUser
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: 'address'})
)

export default enhance(Address)
