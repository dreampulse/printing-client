// @flow

import React, {Fragment} from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector, isValid, change, unregisterField} from 'redux-form'
import omit from 'lodash/omit'

import config from '../../../config'

import * as localStorage from '../service/local-storage'
import * as modalAction from '../action/modal'
import * as coreAction from '../action/core'
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
import {scrollToTop} from './util/scroll-to-top'
import CheckoutLayout from './checkout-layout'
import scrollTo from '../service/scroll-to'
import {formatTelephoneNumber} from '../lib/formatter'
import {required, email} from '../lib/validator'

const AddressPage = ({
  handleSubmit,
  isCompany,
  handleIsCompanyChange,
  submitting,
  useDifferentBillingAddress,
  handleBillingChange,
  billingAddress,
  shippingAddress,
  openPickLocationModal
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

  const renderCompanySection = () => (
    <Fragment>
      <FormRow>
        <Headline
          modifiers={['xs']}
          label="Company information"
          classNames={['u-no-margin-bottom']}
        />
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
    </Fragment>
  )

  const billingAddressSection = (
    <div>
      <FormRow>
        <Headline modifiers={['xs']} label="Billing address" classNames={['u-no-margin-bottom']} />
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
          placeholder="Country"
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
            <Headline
              modifiers={['xs']}
              label="Personal information"
              classNames={['u-no-margin-bottom']}
            />
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

          <FormRow modifiers={['half-half']}>
            <Field
              validate={email}
              component={renderField(InputField)}
              label="Email address"
              name="emailAddress"
              type="email"
            />
            <Field
              validate={required}
              normalize={formatTelephoneNumber}
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

          {isCompany && renderCompanySection()}

          <FormRow>
            <Headline
              modifiers={['xs']}
              label="Shipping address"
              classNames={['u-no-margin-bottom']}
            />
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
              onChangeLinkClick={() => openPickLocationModal({confirmation: true})}
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
          <FormRow>
            <Field
              name="saveAddress"
              component={renderField(LabeledCheckbox)}
              label="Save address for your next purchase"
              type="checkbox"
            />
          </FormRow>
        </FormLayout>
        <div id="billing-address">
          <Button
            type="submit"
            label={submitting ? 'Reviewing…' : 'Review Order'}
            disabled={submitting}
          />
        </div>
      </form>
    </CheckoutLayout>
  )
}

const getInitialUserFormValues = state => {
  const userFromLocalStorage = localStorage.getItem(config.localStorageAddressKey)

  let initialUser
  if (userFromLocalStorage) {
    initialUser = {
      ...userFromLocalStorage,
      shippingAddress: {
        ...userFromLocalStorage.shippingAddress,
        ...state.core.location
      }
    }
  } else {
    initialUser = {
      isCompany: false,
      useDifferentBillingAddress: false,
      saveAddress: true,
      shippingAddress: {
        ...state.core.location
      }
    }
  }

  return (state.core.user && omit(state.core.user, 'userId')) || initialUser
}

const FORM_NAME = 'address'
const selector = formValueSelector(FORM_NAME)

const mapStateToProps = state => ({
  cart: state.core.cart,
  userLocation: state.core.location,
  initialValues: getInitialUserFormValues(state),
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
  changeFormValue: change,
  removeFormValue: unregisterField,
  saveUser: coreAction.saveUser,
  openPickLocationModal: modalAction.openPickLocationModal,
  goToReviewOrder: navigationAction.goToReviewOrder,
  goToUpload: navigationAction.goToUpload
}

const enhance = compose(
  scrollToTop(),
  guard(state => state.core.cart),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleIsCompanyChange: props => isCompany => {
      if (isCompany === false) {
        props.changeFormValue(FORM_NAME, 'companyName', '')
        props.changeFormValue(FORM_NAME, 'vatId', '')
      }
    },
    onSubmit: props => values => {
      if (values.saveAddress) {
        localStorage.setItem(config.localStorageAddressKey, omit(values, 'userId'))
      } else {
        localStorage.removeItem(config.localStorageAddressKey)
      }

      props.saveUser(values).then(() => {
        props.goToReviewOrder()
      })
    },
    handleLocationChange: props => userLocation => {
      props.changeFormValue(FORM_NAME, 'shippingAddress.city', userLocation.city)
      props.changeFormValue(FORM_NAME, 'shippingAddress.zipCode', userLocation.zipCode)
      props.changeFormValue(FORM_NAME, 'shippingAddress.stateCode', userLocation.stateCode)
      props.changeFormValue(FORM_NAME, 'shippingAddress.countryCode', userLocation.countryCode)
    },
    handleBillingChange: props => useDifferentBillingAddress => {
      if (useDifferentBillingAddress === false) {
        props.removeFormValue(FORM_NAME, 'billingAddress.firstName')
        props.removeFormValue(FORM_NAME, 'billingAddress.lastName')
        props.removeFormValue(FORM_NAME, 'billingAddress.address')
        props.removeFormValue(FORM_NAME, 'billingAddress.addressLine2')
        props.removeFormValue(FORM_NAME, 'billingAddress.city')
        props.removeFormValue(FORM_NAME, 'billingAddress.zipCode')
        props.removeFormValue(FORM_NAME, 'billingAddress.stateCode')
        props.removeFormValue(FORM_NAME, 'billingAddress.countryCode')
        props.removeFormValue(FORM_NAME, 'billingAddress.countryCode')
        props.removeFormValue(FORM_NAME, 'billingAddress')
      } else {
        props.changeFormValue(FORM_NAME, 'billingAddress', props.shippingAddress)
      }
    }
  }),
  reduxForm({form: FORM_NAME}),
  lifecycle({
    componentDidUpdate(prevProps) {
      // Special case for the billing address because the dom is not ready in
      // componentDidMount because of REDUX FORM
      // TODO: refactor when removing redux form
      if (
        this.props.useDifferentBillingAddress !== prevProps.useDifferentBillingAddress &&
        this.props.useDifferentBillingAddress === true &&
        this.props.location.state &&
        this.props.location.state.section &&
        this.props.location.state.section === 'billing-address'
      ) {
        setTimeout(() => {
          scrollTo(`#billing-address`)
        }, 100)
      }

      if (this.props.userLocation !== prevProps.userLocation) {
        this.props.handleLocationChange(this.props.userLocation)
      }

      if (this.props.isCompany !== prevProps.isCompany) {
        this.props.handleIsCompanyChange(this.props.isCompany)
      }

      if (this.props.useDifferentBillingAddress !== prevProps.useDifferentBillingAddress) {
        this.props.handleBillingChange(this.props.useDifferentBillingAddress)
      }

      if (this.props.cart !== prevProps.cart) {
        this.props.goToUpload({
          notification: {
            warning: true,
            message:
              'We had to remove all model configurations due to an address or currency change. Please reconfigure all uploaded models.'
          }
        })
      }
    }
  })
)

export default enhance(AddressPage)
