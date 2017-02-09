import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
import InputField from '../component/input-field'
import SectionHeadline from '../component/section-headline'
import Grid from '../component/grid'
import Column from '../component/column'

import {renderField} from './util/form'

import {reviewOrder} from '../action/user'
import {goBack} from '../action/navigation'

const Address = ({
  handleSubmit,
  onGoBack,
  formValues,
  submitting
}) => {
  const CheckBox = ({label, name}) => (
    <span>
      <Field name={name} component="input" type="checkbox" />
      {label}
    </span>
  )

  const CompanySection = () => (
    <div>
      <SectionHeadline label="Company information" />
      <Column md={6}>
        <Field component={renderField(InputField)} label="Company Name" name="companyName" />
      </Column>
      <Column md={6}>
        <Field component={renderField(InputField)} label="VAT ID" name="vatId" />
      </Column>
    </div>
  )

  const BillingAddressSection = () => (
    <div>
      <SectionHeadline label="Billing address" />
      <Column md={6}>
        <Field component={renderField(InputField)} label="First name" name="billingAddress.firstName" />
      </Column>
      <Column md={6}>
        <Field component={renderField(InputField)} label="Last name" name="billingAddress.lastName" />
      </Column>

      <Column md={9}>
        <Field component={renderField(InputField)} label="Street" name="billingAddress.street" />
      </Column>
      <Column md={3}>
        <Field component={renderField(InputField)} label="House number" name="billingAddress.houseNumber" />
      </Column>

      <Column md={12}>
        <Field component={renderField(InputField)} label="Address line 2" name="billingAddress.addressLine2" />
      </Column>

      <Column md={6}>
        <Field component={renderField(InputField)} label="City" name="billingAddress.city" />
      </Column>
      <Column md={6}>
        <Field component={renderField(InputField)} label="Zip code" name="billingAddress.zipCode" />
      </Column>

      <Column md={6}>
        <Field component={renderField(InputField)} label="State / Province / Region" name="billingAddress.stateCode" />
      </Column>
      <Column md={6}>
        <Field component={renderField(InputField)} label="Country code" name="billingAddress.countryCode" />
      </Column>
    </div>
  )

  const AddressForm = () => (
    <form onSubmit={handleSubmit}>

      <Grid>
        <SectionHeadline label="Personal information" />

        <Column md={6}>
          <Field component={renderField(InputField)} label="First name" name="shippingAddress.firstName" />
        </Column>
        <Column md={6}>
          <Field component={renderField(InputField)} label="Last name" name="shippingAddress.lastName" />
        </Column>

        <Column md={6}>
          <Field component={renderField(InputField)} label="Email address" name="emailAddress" type="email" />
        </Column>
        <Column md={6}>
          <Field component={renderField(InputField)} label="Phone number" name="phoneNumber" />
        </Column>

        <Column md={12}>
          <CheckBox label="I am ordering for a company" name="isCompany" />
        </Column>

        {formValues.isCompany && <CompanySection />}

        <SectionHeadline label="Shipping address" />

        <Column md={9}>
          <Field component={renderField(InputField)} label="Street" name="shippingAddress.street" />
        </Column>
        <Column md={3}>
          <Field component={renderField(InputField)} label="House number" name="shippingAddress.houseNumber" />
        </Column>

        <Column md={12}>
          <Field component={renderField(InputField)} label="Address line 2" name="shippingAddress.addressLine2" />
        </Column>

        <Column md={6}>
          <Field component={renderField(InputField)} label="City" name="shippingAddress.city" />
        </Column>
        <Column md={6}>
          <Field component={renderField(InputField)} label="Zip code" name="shippingAddress.zipCode" />
        </Column>

        <Column md={6}>
          <Field component={renderField(InputField)} label="State / Province / Region" name="shippingAddress.stateCode" />
        </Column>
        <Column md={6}>
          <Field component={renderField(InputField)} label="Country code" name="shippingAddress.countryCode" />
        </Column>

        <Column md={12}>
          <CheckBox label="Use different billing address" name="useDifferentBillingAddress" />
        </Column>

        {formValues.useDifferentBillingAddress && <BillingAddressSection />}

      </Grid>

      <Button
        type="submit"
        label={submitting ? 'Reviewing…' : 'Review Order'}
        disabled={submitting}
      />
    </form>
  )

  return (
    <Main>
      <Button label="Back" onClick={onGoBack} />
      <Headline label="Shipping address" modifiers={['xl']} />
      <AddressForm />
    </Main>
  )
}

const mapStateToProps = state => ({
  initialValues: state.user.user,
  formValues: state.form.address && state.form.address.values || {}
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onSubmit: reviewOrder
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: 'address'})
)

export default enhance(Address)
