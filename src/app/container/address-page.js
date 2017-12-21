import React from 'react'
import {compose} from 'recompose'
import {Field, reduxForm, formValueSelector, isValid, change} from 'redux-form'

import FormLayout from '../component/form-layout'
import FormRow from '../component/form-row'
import InputField from '../component/input-field'
import LabeledCheckbox from '../component/labeled-checkbox'
import Button from '../component/button'
import SelectMenu from '../component/select-menu'
import SelectField from '../component/select-field'
import Headline from '../component/headline'
import PageHeader from '../component/page-header'
import Link from '../component/link'

import backIcon from '../../asset/icon/back.svg'

import {reviewOrder} from '../action/user'
import {goToHome} from '../action/navigation'

import {getCountriesMenu, getStateName, getStates, getCountryName} from '../service//country'
import {renderField} from './util/form'
import {connectLegacy} from './util/connect-legacy'
import {guard} from './util/guard'
import AppLayout from './app-layout'

const required = value => (value ? undefined : 'Required')
const email = value =>
  !value || (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    ? 'Invalid email address'
    : undefined
const tel = value =>
  !value || (value && !/^[+]?[0-9\-\s()]*$/i.test(value)) ? 'Invalid phone number' : undefined

const AddressPage = ({
  handleSubmit,
  onGoToHome,
  isCompany,
  handleIsCompanyChange,
  submitting,
  useDifferentBillingAddress,
  handleBillingChange,
  billingAddress,
  shippingAddress
}) => {
  const CountrySelect = ({onChange, value, ...props}) => {
    const changeCountry = val => onChange(val.value)
    const val = !value || value === '' ? undefined : {value, label: getCountryName(value)}
    const countryMenu = <SelectMenu values={getCountriesMenu()} />
    return <SelectField menu={countryMenu} value={val} onChange={changeCountry} {...props} />
  }

  const StateSelect = ({onChange, countryCode, value, ...props}) => {
    const changeState = val => onChange(val.value)
    const states = getStates(countryCode)
    const stateMenu = <SelectMenu values={states || []} />
    const isDisabled = !states
    const stateName = getStateName(countryCode, value)
    const actualValue = !stateName || isDisabled ? undefined : {value, label: stateName}

    // TODO: validation of the select field is not working
    return (
      <SelectField
        validate={!isDisabled ? required : undefined}
        menu={stateMenu}
        value={actualValue}
        onChange={changeState}
        disabled={isDisabled}
        {...props}
      />
    )
  }

  const companySection = (
    <div>
      <FormRow>
        <Headline modifiers={['xs']} label="Company information" />
      </FormRow>
      <FormRow modifiers={['half-half']}>
        <Field
          validate={required}
          component={renderField(InputField)}
          label="Company Name"
          name="companyName"
        />
        <Field
          validate={required}
          component={renderField(InputField)}
          label="VAT ID"
          name="vatId"
        />
      </FormRow>
    </div>
  )

  const billingAddressSection = (
    <div>
      <FormRow>
        <Headline modifiers={['xs']} label="Billing address" />
      </FormRow>

      <FormRow modifiers={['half-half']}>
        <Field
          validate={required}
          component={renderField(InputField)}
          label="First name"
          name="billingAddress.firstName"
        />
        <Field
          validate={required}
          component={renderField(InputField)}
          label="Last name"
          name="billingAddress.lastName"
        />
      </FormRow>

      <FormRow modifiers={['l-s']}>
        <Field
          validate={required}
          component={renderField(InputField)}
          label="Street"
          name="billingAddress.street"
        />
        <Field
          validate={required}
          component={renderField(InputField)}
          label="House number"
          name="billingAddress.houseNumber"
        />
      </FormRow>

      <FormRow>
        <Field
          component={renderField(InputField)}
          label="Address line 2"
          name="billingAddress.addressLine2"
        />
      </FormRow>

      <FormRow modifiers={['half-half']}>
        <Field
          validate={required}
          component={renderField(InputField)}
          label="City"
          name="billingAddress.city"
        />
        <Field
          validate={required}
          component={renderField(InputField)}
          label="Zip code"
          name="billingAddress.zipCode"
        />
      </FormRow>

      <FormRow modifiers={['half-half']}>
        <Field
          component={renderField(StateSelect)}
          placeholder="State"
          name="billingAddress.stateCode"
          type="select"
          countryCode={billingAddress.countryCode}
        />
        <Field
          validate={required}
          component={renderField(CountrySelect)}
          label="Country"
          name="billingAddress.countryCode"
        />
      </FormRow>
    </div>
  )

  const backLink = (
    <Link
      icon={backIcon}
      onClick={event => {
        event.preventDefault()
        onGoToHome()
      }}
      label="Back"
    />
  )

  return (
    <AppLayout currentStep={1}>
      <PageHeader label="Shipping address" backLink={backLink} />
      <form onSubmit={handleSubmit}>
        <FormLayout>
          <FormRow>
            <Headline modifiers={['xs']} label="Personal information" />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field
              validate={required}
              component={renderField(InputField)}
              label="First name"
              name="shippingAddress.firstName"
            />
            <Field
              validate={required}
              component={renderField(InputField)}
              label="Last name"
              name="shippingAddress.lastName"
            />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field
              validate={email}
              component={renderField(InputField)}
              label="Email address"
              name="emailAddress"
              type="email"
            />
            <Field
              validate={tel}
              component={renderField(InputField)}
              label="Phone number"
              name="phoneNumber"
              type="tel"
            />
          </FormRow>

          <FormRow>
            <Field
              onChangeValue={handleIsCompanyChange}
              name="isCompany"
              component={renderField(LabeledCheckbox)}
              label="I am ordering for a company"
              type="checkbox"
            />
          </FormRow>

          {isCompany && companySection}

          <FormRow>
            <Headline modifiers={['xs']} label="Shipping address" />
          </FormRow>

          <FormRow modifiers={['l-s']}>
            <Field
              validate={required}
              component={renderField(InputField)}
              label="Street"
              name="shippingAddress.street"
            />
            <Field
              validate={required}
              component={renderField(InputField)}
              label="House number"
              name="shippingAddress.houseNumber"
            />
          </FormRow>

          <FormRow>
            <Field
              component={renderField(InputField)}
              label="Address line 2"
              name="shippingAddress.addressLine2"
            />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field
              validate={required}
              component={renderField(InputField)}
              label="City"
              name="shippingAddress.city"
            />
            <Field
              validate={required}
              component={renderField(InputField)}
              label="Zip code"
              name="shippingAddress.zipCode"
            />
          </FormRow>

          <FormRow modifiers={['half-half']}>
            <Field
              component={renderField(StateSelect)}
              placeholder="State"
              name="shippingAddress.stateCode"
              type="select"
              countryCode={shippingAddress.countryCode}
            />
            <Field
              validate={required}
              component={renderField(CountrySelect)}
              label="Country"
              name="shippingAddress.countryCode"
              type="select"
            />
          </FormRow>

          <FormRow>
            <Field
              onChangeValue={handleBillingChange}
              name="useDifferentBillingAddress"
              component={renderField(LabeledCheckbox)}
              label="Use different billing address"
              type="checkbox"
            />
          </FormRow>

          {useDifferentBillingAddress && billingAddressSection}
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
  useDifferentBillingAddress: selector(state, 'useDifferentBillingAddress'),
  valid: isValid(FORM_NAME)(state),
  companyName: selector(state, 'companyName'),
  vatId: selector(state, 'vatId'),
  billingAddress: {
    countryCode: selector(state, 'billingAddress.countryCode')
  },
  shippingAddress: {
    firstName: selector(state, 'shippingAddress.firstName'),
    lastName: selector(state, 'shippingAddress.lastName'),
    street: selector(state, 'shippingAddress.street'),
    houseNumber: selector(state, 'shippingAddress.houseNumber'),
    addressLine2: selector(state, 'shippingAddress.addressLine2'),
    city: selector(state, 'shippingAddress.city'),
    zipCode: selector(state, 'shippingAddress.zipCode'),
    stateCode: selector(state, 'shippingAddress.stateCode'),
    countryCode: selector(state, 'shippingAddress.countryCode')
  }
})

const mapDispatchToProps = {
  onGoToHome: goToHome,
  onSubmit: reviewOrder,
  clearBillingAddress: () => {},
  handleIsCompanyChange: () => (dispatch, getState) => {
    const state = getState()
    const isComany = selector(state, 'isCompany')
    if (isComany === false) {
      dispatch(change(FORM_NAME, 'companyName', ''))
      dispatch(change(FORM_NAME, 'vatId', ''))
    }
  },
  handleBillingChange: () => (dispatch, getState) => {
    const state = getState()
    const useDifferentBillingAddress = selector(state, 'useDifferentBillingAddress')
    if (useDifferentBillingAddress === false) {
      dispatch(change(FORM_NAME, 'billingAddress.firstName', ''))
      dispatch(change(FORM_NAME, 'billingAddress.lastName', ''))
      dispatch(change(FORM_NAME, 'billingAddress.street', ''))
      dispatch(change(FORM_NAME, 'billingAddress.houseNumber', ''))
      dispatch(change(FORM_NAME, 'billingAddress.addressLine2', ''))
      dispatch(change(FORM_NAME, 'billingAddress.city', ''))
      dispatch(change(FORM_NAME, 'billingAddress.zipCode', ''))
      dispatch(change(FORM_NAME, 'billingAddress.stateCode', ''))
      dispatch(change(FORM_NAME, 'billingAddress.countryCode', ''))
    } else {
      dispatch(
        change(FORM_NAME, 'billingAddress.firstName', selector(state, 'shippingAddress.firstName'))
      )
      dispatch(
        change(FORM_NAME, 'billingAddress.lastName', selector(state, 'shippingAddress.lastName'))
      )
      dispatch(
        change(FORM_NAME, 'billingAddress.street', selector(state, 'shippingAddress.street'))
      )
      dispatch(
        change(
          FORM_NAME,
          'billingAddress.houseNumber',
          selector(state, 'shippingAddress.houseNumber')
        )
      )
      dispatch(
        change(
          FORM_NAME,
          'billingAddress.addressLine2',
          selector(state, 'shippingAddress.addressLine2')
        )
      )
      dispatch(change(FORM_NAME, 'billingAddress.city', selector(state, 'shippingAddress.city')))
      dispatch(
        change(FORM_NAME, 'billingAddress.zipCode', selector(state, 'shippingAddress.zipCode'))
      )
      dispatch(
        change(FORM_NAME, 'billingAddress.stateCode', selector(state, 'shippingAddress.stateCode'))
      )
      dispatch(
        change(
          FORM_NAME,
          'billingAddress.countryCode',
          selector(state, 'shippingAddress.countryCode')
        )
      )
    }
  }
}

const enhance = compose(
  guard(state => state.legacy.price.selectedOffer),
  connectLegacy(mapStateToProps, mapDispatchToProps),
  reduxForm({form: FORM_NAME})
)

export default enhance(AddressPage)
