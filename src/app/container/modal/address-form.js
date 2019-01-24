import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {connect} from 'react-redux'
import {withFormik, Field, Form} from 'formik'
import omit from 'lodash/omit'

import * as modalAction from '../../action/modal'
import * as localStorage from '../../service/local-storage'
import * as coreAction from '../../action/core'
import * as navigationAction from '../../action/navigation'
import config from '../../../../config'
import {renderFormikField} from '../util/form'
import {formatTelephoneNumber} from '../../lib/formatter'
import {getCountriesMenu, getStateName, getStates, getCountryName} from '../../service/country'
import {required, email} from '../../lib/validator'
import scrollTo from '../../service/scroll-to'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import FormRow from '../../component/form-row'
import InputField from '../../component/input-field'
import LabeledCheckbox from '../../component/labeled-checkbox'
import SelectField from '../../component/select-field'
import StaticField from '../../component/static-field'
import SelectMenu from '../../component/select-menu'

const AddressFormModal = ({
  closeModal,
  values,
  isSubmitting,
  handleSubmit,
  openPickLocationModal,
  setFieldValue
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
        <Headline
          modifiers={['xs']}
          label="Company information"
          classNames={['u-no-margin-bottom']}
        />
      </FormRow>
      <FormRow modifiers={['half-half']}>
        <Field component={renderFormikField(InputField)} label="Company Name" name="companyName" />
        <Field component={renderFormikField(InputField)} label="VAT ID" name="vatId" />
      </FormRow>
    </>
  )

  const billingAddressSection = (
    <div id="billing-address">
      <FormRow>
        <Headline modifiers={['l', 'minor']} label="Billing Address" />
      </FormRow>

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
          label="Address line 2"
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

  const headline = <Headline label="Shipping Address" modifiers={['l', 'minor']} />
  const buttons = [
    <Button
      label="Cancel"
      modifiers={['text']}
      onClick={() => {
        closeModal()
      }}
    />,
    <Button
      label="Confirm"
      disabled={isSubmitting}
      onClick={() => {
        handleSubmit()
      }}
    />
  ]

  return (
    <Overlay
      modifiers={['l']}
      headline={headline}
      buttons={buttons}
      closePortal={() => closeModal()}
    >
      <Form>
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
            normalize={formatTelephoneNumber}
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
            onChangeValue={value => {
              if (!value) {
                setFieldValue('companyName')
                setFieldValue('vatId')
              }
            }}
          />
        </FormRow>

        {values.isCompany && renderCompanySection()}

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
            component={renderFormikField(InputField)}
            label="Address"
            name="shippingAddress.address"
            maxLength="35"
          />
        </FormRow>

        <FormRow>
          <Field
            component={renderFormikField(InputField)}
            label="Address line 2"
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
          <StaticField
            value={getCountryName(values.shippingAddress.countryCode || 'de')}
            changeLinkLabel="Change…"
            onChangeLinkClick={() => openPickLocationModal({confirmation: true})}
          />
        </FormRow>

        <FormRow>
          <Field
            name="useDifferentBillingAddress"
            onChangeValue={value => {
              if (value) {
                setFieldValue('billingAddress', values.shippingAddress)
              } else {
                setFieldValue('billingAddress', {})
              }
            }}
            component={renderFormikField(LabeledCheckbox)}
            label="Use different billing address"
          />
        </FormRow>

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
  user: state.core.user
})

const mapDispatchToProps = {
  closeModal: modalAction.closeModal,
  openPickLocationModal: modalAction.openPickLocationModal,
  saveUser: coreAction.saveUser,
  goToUpload: navigationAction.goToUpload
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
          }
        }
      } else {
        initialUser = {
          isCompany: false,
          useDifferentBillingAddress: false,
          saveAddress: true,
          shippingAddress: {
            ...props.userLocation
          }
        }
      }
      return (props.user && omit(props.user, 'userId')) || initialUser
    },
    handleSubmit: (values, {props}) => {
      if (values.saveAddress) {
        localStorage.setItem(config.localStorageAddressKey, omit(values, 'userId'))
      } else {
        localStorage.removeItem(config.localStorageAddressKey)
      }

      if (values.useDifferentBillingAddress === false) {
        values.billingAddress = values.shippingAddress
      }

      props.saveUser(values).then(() => {
        props.closeModal()
      })
    },
    displayName: 'AddressForm'
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
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
        scrollTo('#billing-address', global.document.querySelector('.overlay__modal'))
      }
    }
  })
)

export default enhance(AddressFormModal)
