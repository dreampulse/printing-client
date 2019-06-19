import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {connect} from 'react-redux'
import {withFormik, Field, Form} from 'formik'
import omit from 'lodash/omit'

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'
import * as navigationActions from '../../action/navigation'

import * as localStorage from '../../service/local-storage'
import config from '../../../../config'
import {renderFormikField} from '../util/form'
import {formatTelephoneNumber} from '../../lib/formatter'
import {getCountriesMenu, getStateName, getStates, getCountryName} from '../../service/country'
import {required, email, vat} from '../../lib/validator'
import scrollTo from '../../service/scroll-to'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import FormRow from '../../component/form-row'
import InputField from '../../component/input-field'
import LabeledCheckbox from '../../component/labeled-checkbox'
import SelectField from '../../component/select-field'
import SelectMenu from '../../component/select-menu'
import Notification from '../../component/notification'

const isSameCountry = (location, address) => location.countryCode === address.countryCode

const addressFormOverlayScrollContainerId = 'addressFormOverlayScrollContainer'

const AddressFormModal = ({
  closeModal,
  values,
  isSubmitting,
  handleSubmit,
  isValid,
  userLocation
}) => {
  const CountrySelect = ({onChange, value, name, ...props}) => {
    const changeCountry = val => onChange(val.value, name)
    const val = !value || value === '' ? undefined : {value, label: getCountryName(value)}
    const countryMenu = <SelectMenu values={getCountriesMenu()} />
    return (
      <SelectField menu={countryMenu} value={val} onChange={changeCountry} name={name} {...props} />
    )
  }

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
      <FormRow modifiers={['half-half']}>
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
    <div id="billing-address">
      <Headline size="s" classNames={['u-margin-top-xl']} label="Billing Address" />
      <FormRow modifiers={['half-half']}>
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
          label="Additional address information, e.g. company name, floor, building, etc..."
          name="billingAddress.addressLine2"
          maxLength="35"
        />
      </FormRow>

      <FormRow modifiers={['half-half']}>
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

      <FormRow modifiers={['half-half']}>
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
          component={renderFormikField(CountrySelect)}
          placeholder="Country"
          name="billingAddress.countryCode"
        />
      </FormRow>
    </div>
  )

  const headline = <Headline label="Your Address" size="l" />
  const buttons = [
    <Button
      key="cancel_button"
      label="Cancel"
      text
      onClick={() => {
        closeModal()
      }}
    />,
    <Button
      key="confirm_button"
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
  ]

  return (
    <Overlay
      headline={headline}
      buttons={buttons}
      closePortal={() => closeModal()}
      noCloseOnClickOutside
      scrollContainerId={addressFormOverlayScrollContainerId}
    >
      <Form>
        <div id="shipping-address">
          <FormRow>
            <Headline size="s" label="Personal information" classNames={['u-no-margin-bottom']} />
          </FormRow>

          <FormRow modifiers={['half-half']}>
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

          <FormRow modifiers={['half-half']}>
            <Field
              validate={email}
              component={renderFormikField(InputField)}
              label="Email address"
              name="emailAddress"
              type="email"
            />
            <Field
              validate={required}
              component={renderFormikField(InputField)}
              label="Phone number"
              name="phoneNumber"
              type="tel"
            />
          </FormRow>

          <FormRow>
            <Field
              name="isCompany"
              component={renderFormikField(LabeledCheckbox)}
              label="I am ordering on behalf of a company"
            />
          </FormRow>

          {values.isCompany && renderCompanySection()}

          <FormRow>
            <Headline size="s" label="Shipping address" classNames={['u-no-margin-bottom']} />
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
              label="Additional address information, e.g. company name, floor, building, etc..."
              name="shippingAddress.addressLine2"
              maxLength="35"
            />
          </FormRow>

          <FormRow modifiers={['half-half']}>
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

          <FormRow modifiers={['half-half']}>
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
              component={renderFormikField(CountrySelect)}
              placeholder="Country"
              name="shippingAddress.countryCode"
            />
          </FormRow>

          {!isSameCountry(userLocation, values.shippingAddress) && (
            <FormRow>
              <Notification
                message="By changing the country you have configure all models in your cart again."
                warning
              />
            </FormRow>
          )}

          <FormRow>
            <Field
              name="useDifferentBillingAddress"
              component={renderFormikField(LabeledCheckbox)}
              label="Use different billing address"
            />
          </FormRow>
        </div>

        {values.useDifferentBillingAddress && billingAddressSection}

        <FormRow>
          <Field
            name="saveAddress"
            component={renderFormikField(LabeledCheckbox)}
            label="Save address for your next purchase"
          />
        </FormRow>
      </Form>
    </Overlay>
  )
}

const mapStateToProps = state => ({
  userLocation: state.core.location,
  user: state.core.user,
  cart: state.core.cart
})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal,
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
      const userFromLocalStorage = localStorage.getItem(config.localStorageAddressKey)
      let initialUser
      if (userFromLocalStorage) {
        initialUser = {
          ...userFromLocalStorage,
          shippingAddress: {
            ...userFromLocalStorage.shippingAddress,
            ...props.userLocation
          },
          billingAddress: {
            ...userFromLocalStorage.billingAddress
          },
          useDifferentBillingAddress:
            !userFromLocalStorage.useDifferentBillingAddress && props.scrollTo === 'billing-address'
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

      if (values.saveAddress) {
        localStorage.setItem(config.localStorageAddressKey, omit(values, 'userId'))
      } else {
        localStorage.removeItem(config.localStorageAddressKey)
      }

      const normalizedValues = {
        ...values,
        phoneNumber: formatTelephoneNumber(values.phoneNumber)
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
        props.closeModal()
      } else {
        props.saveUser(normalizedValues).then(() => {
          props.closeModal()
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

      if (this.props.cart !== prevProps.cart) {
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
        scrollTo('#billing-address', `#${addressFormOverlayScrollContainerId}`)
      }
    }
  })
)

export default enhance(AddressFormModal)
