import reducer from '../../../../src/app/reducer/user'
import TYPE from '../../../../src/app/action-type'

describe('User reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      userId: null,
      currency: 'USD',
      user: {
        emailAddress: '',
        phoneNumber: '',
        isCompany: false,
        companyName: undefined,
        vatId: '',
        shippingAddress: {
          firstName: '',
          lastName: '',
          address: '',
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
          address: '',
          addressLine2: '',
          city: '',
          zipCode: '',
          stateCode: '',
          countryCode: ''
        }
      },
      utmParams: {}
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

  describe('handles TYPE.USER.UTM_PARAMS_SET:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'old-state'
      }

      const action = {
        type: TYPE.USER.UTM_PARAMS_SET,
        payload: 'some-utm-params'
      }

      expect(reducer(state, action), 'to equal', {
        some: 'old-state',
        utmParams: 'some-utm-params'
      })
    })
  })
})
