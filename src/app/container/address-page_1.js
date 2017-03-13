import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import FormLayout from '../component/from-layout'
import FormRow from '../component/form-row'
import InputField from '../component/input-field'
import LabeledCheckbox from '../component/labeled-checkbox'
import Button from '../component/button'
import AppLayout from './app-layout'
import Headline from '../component-legacy/headline'

import {renderField} from './util/form'

import {reviewOrder} from '../action/user'
import {goBack} from '../action/navigation'

const AddressPage = ({
  handleSubmit,
  onGoBack,
  formValues,
  submitting
}) => {
  return (
    <AppLayout currentStep={0}>
      <Button label="Back" onClick={onGoBack} />
      <Headline label="Shipping address" modifiers={['xl']} />
      <form onSubmit={handleSubmit}>
        <FormLayout>
          <FormRow modifiers={['half-half']>
            <Field component={renderField(InputField)} label="First name" name="shippingAddress.firstName" />
            <Field component={renderField(InputField)} label="Last name" name="shippingAddress.lastName" />
          </FormRow>

          <FormRow modifiers={['half-half']>
            <Field component={renderField(InputField)} label="Email address" name="emailAddress" type="email" />
            <Field component={renderField(InputField)} label="Phone number" name="phoneNumber" />
          </FormRow>

          <FormRow>
            <CheckBox label="I am ordering for a company" name="isCompany" />
          </FormRow>

          <FormRow modifiers={['l-s']>
            <Field component={reanderField(InputField)} label="Street" name="shippingAddress.street" />
            <Field component={renderField(InputField)} label="House number" name="shippingAddress.houseNumber" />
          </FormRow>

          <FormRow>
            <Field component={renderField(InputField)} label="Address line 2" name="shippingAddress.addressLine2" />
          </FormRow>

          <FormRow modifiers={['half-half']>
            <Field component={renderField(InputField)} label="City" name="shippingAddress.city" />
            <Field component={renderField(InputField)} label="Zip code" name="shippingAddress.zipCode" />
          </FormRow>

          <FormRow modifiers={['half-half']>
            <Field component={renderField(InputField)} label="State / Province / Region" name="shippingAddress.stateCode" />
            <Field component={renderField(InputField)} label="Country code" name="shippingAddress.countryCode" />
          </FormRow>

          <FormRow>
            <CheckBox label="Use different billing address" name="useDifferentBillingAddress" />
          </FormRow>

          <FormRow>
            <Button
              type="submit"
              label={submitting ? 'Reviewing…' : 'Review Order'}
              disabled={submitting}
            />
          </FormRow>
        </FormLayout>
      </form>
    </AppLayout>
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

export default enhance(AddressPage)
