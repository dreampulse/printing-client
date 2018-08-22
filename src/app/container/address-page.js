import React from 'react'
import {compose, lifecycle, withHandlers} from 'recompose'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector, isValid, change} from 'redux-form'
import omit from 'lodash/omit'

import {openPickLocation} from '../action/modal'
import {saveUser} from '../action/core'
import * as navigationAction from '../action/navigation'

import FormLayout from '../component/form-layout'
import FormRow from '../component/form-row'
import InputField from '../component/input-field'
import LabeledCheckbox from '../component/labeled-checkbox'
import Button from '../component/button'
import SelectMenu from '../component/select-menu'
import SelectField from '../component/select-field'
import Headline from '../component/headline'
import PageHeader from '../component/page-header'
import StaticField from '../component/static-field'

import {getCountriesMenu, getStateName, getStates, getCountryName} from '../service/country'
import {renderField} from './util/form'
import {guard} from './util/guard'
import CheckoutLayout from './checkout-layout'

// TODO: this should go into a lib and should be tested
const required = value => (value ? undefined : 'Required')
const email = value =>
  !value || (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    ? 'Invalid email address'
    : undefined
const tel = value =>
  !value || (value && !/^[+]?[0-9\-\s()]*$/i.test(value)) ? 'Invalid phone number' : undefined

const AddressPage = ({
  handleSubmit,
  isCompany,
  handleIsCompanyChange,
  submitting,
  useDifferentBillingAddress,
  handleBillingChange,
  billingAddress,
  shippingAddress,
  onOpenPickLocation
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
          maxLength="20"
        />
        <Field
          validate={required}
          component={renderField(InputField)}
          label="Last name"
          name="billingAddress.lastName"
          maxLength="20"
        />
      </FormRow>

      <FormRow>
        <Field
          validate={required}
          component={renderField(InputField)}
          label="Address"
          name="billingAddress.address"
          maxLength="35"
        />
      </FormRow>

      <FormRow>
        <Field
          component={renderField(InputField)}
          label="Address line 2"
          name="billingAddress.addressLine2"
          maxLength="35"
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

  return (
    <CheckoutLayout title="Address" currentStep={0}>
      <PageHeader label="Shipping address" />
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
              maxLength="20"
            />
            <Field
              validate={required}
              component={renderField(InputField)}
              label="Last name"
              name="shippingAddress.lastName"
              maxLength="20"
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

          <FormRow>
            <Field
              validate={required}
              component={renderField(InputField)}
              label="Address"
              name="shippingAddress.address"
              maxLength="35"
            />
          </FormRow>

          <FormRow>
            <Field
              component={renderField(InputField)}
              label="Address line 2"
              name="shippingAddress.addressLine2"
              maxLength="35"
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
            <StaticField
              // TODO: remove default
              value={getCountryName(shippingAddress.countryCode || 'de')}
              changeLinkLabel="Change…"
              onChangeLinkClick={() => onOpenPickLocation(true, true)}
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
    </CheckoutLayout>
  )
}

const transformLocationToInitialUser = location => ({
  isCompany: false,
  useDifferentBillingAddress: false,
  shippingAddress: {
    ...location
  }
})

const FORM_NAME = 'address'
const selector = formValueSelector(FORM_NAME)

const mapStateToProps = state => ({
  cart: state.core.cart,
  location: state.core.location,
  initialValues:
    (state.core.user && omit(state.core.user, 'userId')) ||
    transformLocationToInitialUser(state.core.location),
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
    address: selector(state, 'shippingAddress.address'),
    addressLine2: selector(state, 'shippingAddress.addressLine2'),
    city: selector(state, 'shippingAddress.city'),
    zipCode: selector(state, 'shippingAddress.zipCode'),
    stateCode: selector(state, 'shippingAddress.stateCode'),
    countryCode: selector(state, 'shippingAddress.countryCode')
  }
})

const mapDispatchToProps = {
  onChangeFormValue: change,
  onSaveUser: saveUser,
  onOpenPickLocation: openPickLocation,
  onGoToReviewOrder: navigationAction.goToReviewOrder,
  onGoToUpload: navigationAction.goToUpload
}

const enhance = compose(
  guard(state => state.core.cart),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleIsCompanyChange: props => isCompany => {
      if (isCompany === false) {
        props.onChangeFormValue(FORM_NAME, 'companyName', '')
        props.onChangeFormValue(FORM_NAME, 'vatId', '')
      }
    },
    onSubmit: props => values => {
      props.onSaveUser(values).then(() => {
        props.onGoToReviewOrder()
      })
    },
    handleLocationChange: props => location => {
      props.onChangeFormValue(FORM_NAME, 'shippingAddress.city', location.city)
      props.onChangeFormValue(FORM_NAME, 'shippingAddress.zipCode', location.zipCode)
      props.onChangeFormValue(FORM_NAME, 'shippingAddress.stateCode', location.stateCode)
      props.onChangeFormValue(FORM_NAME, 'shippingAddress.countryCode', location.countryCode)
    },
    handleBillingChange: props => useDifferentBillingAddress => {
      if (useDifferentBillingAddress === false) {
        props.onChangeFormValue(FORM_NAME, 'billingAddress.firstName', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.lastName', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.address', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.addressLine2', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.city', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.zipCode', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.stateCode', '')
        props.onChangeFormValue(FORM_NAME, 'billingAddress.countryCode', '')
      } else {
        props.onChangeFormValue(FORM_NAME, 'billingAddress', props.shippingAddress)
      }
    }
  }),
  reduxForm({form: FORM_NAME}),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.props.handleLocationChange(this.props.location)
      }

      if (this.props.isCompany !== prevProps.isCompany) {
        this.props.handleIsCompanyChange(this.props.isCompany)
      }

      if (this.props.useDifferentBillingAddress !== prevProps.useDifferentBillingAddress) {
        this.props.handleBillingChange(this.props.useDifferentBillingAddress)
      }

      if (this.props.cart !== prevProps.cart) {
        this.props.onGoToUpload({
          warning: true,
          message:
            'We had to remove all model configurations due to an address or currency change. Please reconfigure all uploaded models.'
        })
      }
    }
  })
)

export default enhance(AddressPage)
