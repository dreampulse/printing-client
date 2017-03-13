import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {getCountriesMenu, getUsStateName, getUsStates, getCountryName} from 'Service/country'

import FormLayout from 'Component/form-layout'
import FormRow from 'Component/form-row'
import InputField from 'Component/input-field'
import LabeledCheckbox from 'Component/labeled-checkbox'
import Button from 'Component/button'
import SelectMenu from 'Component/select-menu'
import SelectField from 'Component/select-field'
import Headline from 'Component/headline'
import PageHeader from 'Component/page-header'
import Link from 'Component/link'

import backIcon from 'Icon/back.svg'

import {renderField} from 'Container/util/form'

import {reviewOrder} from 'Action/user'
import {goBack} from 'Action/navigation'

import AppLayout from './app-layout'

const AddressPage = ({
  handleSubmit,
  onGoBack,
  isCompany,
  submitting,
  useDifferentBillingAddress,
  billingAddressCountryCode,
  shippingAddressCountryCode
}) => {
  const CountrySelect = ({onChange, value, ...props}) => {
    const change = val => onChange(val.value)
    const val = !value && value === '' ? null : {value, label: getCountryName(value)}
    const countryMenu = <SelectMenu values={getCountriesMenu()} />
    return (<SelectField menu={countryMenu} value={val} onChange={change} {...props} />)
  }

  const UsStateSelect = ({onChange, countryCode, value, ...props}) => {
    const change = val => onChange(val.value)
    const usStateMenu = <SelectMenu values={getUsStates()} />
    const isDisabled = !countryCode || (countryCode && countryCode !== 'US')
    let actualValue = {value, label: getUsStateName(value)}
    if (isDisabled) {
      actualValue = null
    }
    return (
      <SelectField
        menu={usStateMenu}
        value={actualValue}
        onChange={change}
        disabled={isDisabled}
        {...props}
      />
    )
  }

  const CompanySection = () => (
    <div>
      <FormRow>
        <Headline modifiers={['xs']} label="Company information" />
      </FormRow>
      <FormRow modifiers={['half-half']}>
        <Field component={renderField(InputField)} label="Company Name" name="companyName" />
        <Field component={renderField(InputField)} label="VAT ID" name="vatId" />
      </FormRow>
    </div>
  )

  const BillingAddressSection = () => (
    <div>
      <FormRow>
        <Headline modifiers={['xs']} label="Billing address" />
      </FormRow>

      <FormRow modifiers={['half-half']}>
        <Field component={renderField(InputField)} label="First name" name="billingAddress.firstName" />
        <Field component={renderField(InputField)} label="Last name" name="billingAddress.lastName" />
      </FormRow>

      <FormRow modifiers={['l-s']}>
        <Field component={renderField(InputField)} label="Street" name="billingAddress.street" />
        <Field component={renderField(InputField)} label="House number" name="billingAddress.houseNumber" />
      </FormRow>

      <FormRow>
        <Field component={renderField(InputField)} label="Address line 2" name="billingAddress.addressLine2" />
      </FormRow>

      <FormRow modifiers={['half-half']}>
        <Field component={renderField(InputField)} label="City" name="billingAddress.city" />
        <Field component={renderField(InputField)} label="Zip code" name="billingAddress.zipCode" />
      </FormRow>

      <FormRow modifiers={['half-half']}>
        <Field
          component={renderField(UsStateSelect)}
          placeholder="State / Province / Region"
          name="billingAddress.stateCode"
          type="select"
          countryCode={billingAddressCountryCode}
        />
        <Field component={renderField(CountrySelect)} label="Country" name="billingAddress.countryCode" />
      </FormRow>
    </div>
  )

  const backLink = <Link icon={backIcon} onClick={onGoBack} label="Back" />

  return (
    <AppLayout currentStep={1}>
      <PageHeader label="Shipping address" backLink={backLink} />
      <form onSubmit={handleSubmit}>
        <FormLayout>
          <FormRow>
            <Headline modifiers={['xs']} label="Personal information" />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field component={renderField(InputField)} label="First name" name="shippingAddress.firstName" />
            <Field component={renderField(InputField)} label="Last name" name="shippingAddress.lastName" />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field component={renderField(InputField)} label="Email address" name="emailAddress" type="email" />
            <Field component={renderField(InputField)} label="Phone number" name="phoneNumber" />
          </FormRow>

          <FormRow>
            <Field name="isCompany" component={renderField(LabeledCheckbox)} label="I am ordering for a company" type="checkbox" />
          </FormRow>

          {isCompany && <CompanySection />}

          <FormRow>
            <Headline modifiers={['xs']} label="Shipping address" />
          </FormRow>

          <FormRow modifiers={['l-s']}>
            <Field component={renderField(InputField)} label="Street" name="shippingAddress.street" />
            <Field component={renderField(InputField)} label="House number" name="shippingAddress.houseNumber" />
          </FormRow>

          <FormRow>
            <Field component={renderField(InputField)} label="Address line 2" name="shippingAddress.addressLine2" />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field component={renderField(InputField)} label="City" name="shippingAddress.city" />
            <Field component={renderField(InputField)} label="Zip code" name="shippingAddress.zipCode" />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field
              component={renderField(UsStateSelect)}
              placeholder="State / Province / Region"
              name="shippingAddress.stateCode"
              type="select"
              countryCode={shippingAddressCountryCode}
            />
            <Field component={renderField(CountrySelect)} label="Country" name="shippingAddress.countryCode" type="select" />
          </FormRow>

          <FormRow>
            <Field name="useDifferentBillingAddress" component={renderField(LabeledCheckbox)} label="Use different billing address" type="checkbox" />
          </FormRow>

          {useDifferentBillingAddress && <BillingAddressSection />}

        </FormLayout>

        <Button
          type="submit"
          label={submitting ? 'Reviewing…' : 'Review Order'}
          disabled={submitting}
        />
      </form>
    </AppLayout>
  )
}

const FORM_NAME = 'address'

const selector = formValueSelector(FORM_NAME)
const mapStateToProps = state => ({
  initialValues: state.user.user,
  isCompany: selector(state, 'isCompany'),
  shippingAddressCountryCode: selector(state, 'shippingAddress.countryCode'),
  billingAddressCountryCode: selector(state, 'billingAddress.countryCode'),
  useDifferentBillingAddress: selector(state, 'useDifferentBillingAddress')
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onSubmit: reviewOrder
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: FORM_NAME})
)

export default enhance(AddressPage)
