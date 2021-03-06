import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {connect} from 'react-redux'
import {withFormik, Field, Form} from 'formik'
import omit from 'lodash/omit'

import * as coreActions from '../action/core'
import * as navigationActions from '../action/navigation'

import * as localStorage from '../service/local-storage'
import config from '../../../config'
import {renderFormikField} from './util/form'
import {formatTelephoneNumber} from '../lib/formatter'
import {getStateName, getStates} from '../service/country'
import {required, email, vat, phoneNumber} from '../lib/validator'
import scrollTo from '../service/scroll-to'
import useBreakpoints from '../hook/use-breakpoints'

import Button from '../component/button'
import FormRow from '../component/form-row'
import Headline from '../component/headline'
import InputField from '../component/input-field'
import LabeledCheckbox from '../component/labeled-checkbox'
import SelectField from '../component/select-field'
import CountrySelectField from '../component/country-select-field'
import SelectMenu from '../component/select-menu'

const isSameCountry = (location, address) => location.countryCode === address.countryCode

const AddressFormPartial = ({
  values,
  isSubmitting,
  handleSubmit,
  isValid,
  userLocation,
  children,
  onCancel
}) => {
  const breakpoints = useBreakpoints()

  const StateSelect = ({onChange, countryCode, value, name, ...props}) => {
    const changeState = val => onChange(val.value, name)
    const states = getStates(countryCode)
    const stateMenu = <SelectMenu values={states || []} />
    const isDisabled = !states
    const stateName = getStateName(countryCode, value)
    const actualValue = !stateName || isDisabled ? undefined : {value, label: stateName}

    return (
      <SelectField
        name={name}
        menu={stateMenu}
        value={actualValue}
        onChange={changeState}
        disabled={isDisabled}
        {...props}
      />
    )
  }

  const renderCompanySection = () => (
    <>
      <FormRow>
        <Headline size="s" label="Company information" classNames={['u-no-margin-bottom']} />
      </FormRow>
      <FormRow layout="half-half">
        <Field
          component={renderFormikField(InputField)}
          label="Company Name"
          name="companyName"
          validate={required}
        />
        <Field
          component={renderFormikField(InputField)}
          label="VAT ID"
          name="vatId"
          validate={vat(values.shippingAddress.countryCode, config.euCountries)}
        />
      </FormRow>
    </>
  )

  const billingAddressSection = (
    <>
      <FormRow>
        <Headline size="s" classNames={['u-no-margin-bottom']} label="Billing Address" />
      </FormRow>
      <FormRow layout="half-half">
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="First name"
          name="billingAddress.firstName"
          maxLength="20"
        />
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="Last name"
          name="billingAddress.lastName"
          maxLength="20"
        />
      </FormRow>

      <FormRow>
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="Address"
          name="billingAddress.address"
          maxLength="35"
        />
      </FormRow>

      <FormRow>
        <Field
          component={renderFormikField(InputField)}
          label="Address line 2 (optional)"
          name="billingAddress.addressLine2"
          maxLength="35"
        />
      </FormRow>

      <FormRow layout="half-half">
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="City"
          name="billingAddress.city"
        />
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="Zip code"
          name="billingAddress.zipCode"
        />
      </FormRow>

      <FormRow layout="half-half">
        <Field
          validate={getStates(values.billingAddress.countryCode) ? required : undefined}
          component={renderFormikField(StateSelect)}
          placeholder="State"
          name="billingAddress.stateCode"
          type="select"
          countryCode={values.billingAddress.countryCode}
        />
        <Field
          validate={required}
          component={renderFormikField(CountrySelectField)}
          placeholder="Country"
          name="billingAddress.countryCode"
          changeLabel="Changing the country will reset all your material selections"
          changedLabel="If you select this country your material selection will be reset"
          changeButtonLabel="edit & reset material"
        />
      </FormRow>
    </>
  )

  const submitButton = (
    <Button
      block={breakpoints['mobile-only']}
      key="confirm"
      label={
        isSameCountry(userLocation, values.shippingAddress)
          ? 'Confirm'
          : 'Confirm and change country'
      }
      disabled={isSubmitting || !isValid}
      onClick={() => {
        handleSubmit()
      }}
    />
  )

  const cancelButton = (
    <Button
      block={breakpoints['mobile-only']}
      key="cancel"
      label="Cancel"
      text
      onClick={() => {
        onCancel()
      }}
    />
  )

  const addressForm = (
    <Form>
      <a id="shipping-address" />
      <FormRow>
        <Headline size="s" label="Delivery address" classNames={['u-no-margin-bottom']} />
      </FormRow>
      <FormRow layout="half-half">
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="First name"
          name="shippingAddress.firstName"
          maxLength="20"
        />
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="Last name"
          name="shippingAddress.lastName"
          maxLength="20"
        />
      </FormRow>

      <FormRow>
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="Address"
          name="shippingAddress.address"
          maxLength="35"
        />
      </FormRow>

      <FormRow>
        <Field
          component={renderFormikField(InputField)}
          label="Address line 2 / company"
          name="shippingAddress.addressLine2"
          maxLength="35"
        />
      </FormRow>

      <FormRow layout="half-half">
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="City"
          name="shippingAddress.city"
        />
        <Field
          validate={required}
          component={renderFormikField(InputField)}
          label="Zip code"
          name="shippingAddress.zipCode"
        />
      </FormRow>
      <FormRow layout="half-half">
        <Field
          validate={getStates(values.shippingAddress.countryCode) ? required : undefined}
          component={renderFormikField(StateSelect)}
          placeholder="State"
          name="shippingAddress.stateCode"
          type="select"
          countryCode={values.shippingAddress.countryCode}
        />
        <Field
          validate={required}
          component={renderFormikField(CountrySelectField)}
          placeholder="Country"
          name="shippingAddress.countryCode"
          changeLabel="Changing the country will reset all your material selections"
          changedLabel="If you select this country your material selection will be reset"
          changeButtonLabel="edit & reset material"
        />
      </FormRow>

      <FormRow layout="half-half">
        <Field
          validate={email}
          component={renderFormikField(InputField)}
          label="Email address"
          name="emailAddress"
          type="email"
        />
        <Field
          validate={phoneNumber}
          component={renderFormikField(InputField)}
          label="Phone number"
          name="phoneNumber"
          type="tel"
        />
      </FormRow>

      <Field
        name="isCompany"
        component={renderFormikField(LabeledCheckbox)}
        label="I am ordering on behalf of a company"
      />

      {values.isCompany && renderCompanySection()}

      <Field
        name="useDifferentBillingAddress"
        component={renderFormikField(LabeledCheckbox)}
        label="Use different billing address"
      />

      {values.useDifferentBillingAddress && billingAddressSection}
      <a id="billing-address" />

      <Field
        name="saveAddress"
        component={renderFormikField(LabeledCheckbox)}
        label="Save address for your next purchase"
      />
    </Form>
  )

  return children({submitButton, addressForm, cancelButton})
}

const mapStateToProps = state => ({
  userLocation: state.core.location,
  user: state.core.user,
  cart: state.core.cart
})

const mapDispatchToProps = {
  saveUser: coreActions.saveUser,
  goToUpload: navigationActions.goToUpload,
  onUpdateLocation: coreActions.updateLocation
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFormik({
    mapPropsToValues: props => {
      let initialUser
      if (props.user) {
        initialUser = {
          ...props.user,
          useDifferentBillingAddress:
            !props.user.useDifferentBillingAddress && props.scrollTo === 'billing-address'
        }
      } else {
        initialUser = {
          isCompany: false,
          useDifferentBillingAddress: props.scrollTo === 'billing-address',
          saveAddress: true,
          shippingAddress: {
            ...props.userLocation
          },
          billingAddress: {}
        }
      }
      return {
        ...((props.user && omit(props.user, 'userId')) || initialUser),
        useDifferentBillingAddress:
          props.scrollTo === 'billing-address' ||
          (props.user && props.user.useDifferentBillingAddress === true) ||
          initialUser.useDifferentBillingAddress
      }
    },
    handleSubmit: (values, {props}) => {
      if (values.useDifferentBillingAddress === false) {
        values.billingAddress = values.shippingAddress
      }

      const normalizedValues = {
        ...values,
        phoneNumber: formatTelephoneNumber(values.phoneNumber)
      }

      if (normalizedValues.saveAddress) {
        localStorage.setItem(config.localStorageAddressKey, omit(normalizedValues, 'userId'))
      } else {
        localStorage.removeItem(config.localStorageAddressKey)
      }

      if (!isSameCountry(props.userLocation, values.shippingAddress)) {
        props.onUpdateLocation(
          {
            city: '',
            zipCode: '',
            stateCode: values.shippingAddress.stateCode,
            countryCode: values.shippingAddress.countryCode
          },
          true
        )
        props.onSubmitted()
      } else {
        props.saveUser(normalizedValues).then(() => {
          props.onSubmitted()
        })
      }
    },
    isInitialValid: true,
    displayName: 'AddressForm'
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (
        prevProps.values.useDifferentBillingAddress !== this.props.values.useDifferentBillingAddress
      ) {
        this.props.setFieldValue(
          'billingAddress',
          this.props.values.useDifferentBillingAddress === false
            ? {}
            : this.props.values.shippingAddress
        )
      }

      if (prevProps.values.isCompany !== this.props.values.isCompany) {
        this.props.setFieldValue('companyName', '')
        this.props.setFieldValue('vatId', '')
      }

      if (!this.props.cart) {
        this.props.goToUpload({
          notification: {
            warning: true,
            message:
              'We had to remove all model configurations due to an address or currency change. Please reconfigure all uploaded models.'
          }
        })
      }
    },
    componentDidMount() {
      if (this.props.scrollTo === 'billing-address') {
        scrollTo('#billing-address', this.props.scrollContainerSelector)
      }
    }
  })
)

AddressFormPartial.propTypes = {
  scrollContainerSelector: PropTypes.string.isRequired,
  scrollTo: PropTypes.string,
  children: PropTypes.func,
  onSubmitted: PropTypes.func,
  onCancel: PropTypes.func
}

export default enhance(AddressFormPartial)
