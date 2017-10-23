import reducer from 'Reducer/user'
import TYPE from '../../../../src/app/action-type'

describe('User reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      userId: null,
      user: {
        emailAddress: '',
        phoneNumber: '',
        currency: 'USD',
        isCompany: false,
        companyName: undefined,
        vatId: '',
        shippingAddress: {
          firstName: '',
          lastName: '',
          street: '',
          houseNumber: '',
          addressLine2: '',
          city: '',
          zipCode: '',
          stateCode: '',
          countryCode: ''
        },
        useDifferentBillingAddress: undefined,
        billingAddress: {
          firstName: '',
          lastName: '',
          street: '',
          houseNumber: '',
          addressLine2: '',
          city: '',
          zipCode: '',
          stateCode: '',
          countryCode: ''
        }
      }
    })
  })

  describe('handles TYPE.USER.SHIPPING_ADDRESS_CHANGED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'old-state',
        user: {
          some: 'old-user'
        }
      }

      const action = {
        type: TYPE.USER.SHIPPING_ADDRESS_CHANGED,
        payload: {
          address: 'some-shipping-address'
        }
      }

      expect(reducer(state, action), 'to equal', {
        some: 'old-state',
        user: {
          some: 'old-user',
          shippingAddress: 'some-shipping-address'
        }
      })
    })
  })

  describe('handles TYPE.USER.CREATED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'old-state'
      }

      const action = {
        type: TYPE.USER.CREATED,
        payload: {
          userId: 'some-user-id'
        }
      }

      expect(reducer(state, action), 'to equal', {
        some: 'old-state',
        userId: 'some-user-id'
      })
    })
  })

  describe('handles TYPE.USER.CREATED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'old-state'
      }

      const action = {
        type: TYPE.USER.UPDATED,
        payload: 'some-user'
      }

      expect(reducer(state, action), 'to equal', {
        some: 'old-state',
        user: 'some-user'
      })
    })
  })
})