import reducer from '../../../../src/app/reducer/order'
import TYPE from '../../../../src/app/action-type'

describe('Order reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      orderId: null,
      orderNumber: null,
      paymentToken: null,
      orderInProgress: false
    })
  })

  describe('handles TYPE.ORDER.ORDERED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'thing'
      }

      const action = {
        type: TYPE.ORDER.ORDERED,
        payload: {
          orderId: 'some-order-id',
          orderNumber: 'some-order-number'
        }
      }

      expect(reducer(state, action), 'to equal', {
        some: 'thing',
        orderId: 'some-order-id',
        orderNumber: 'some-order-number',
        orderInProgress: false
      })
    })
  })

  describe('handles TYPE.ORDER.PAYED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'thing'
      }

      const action = {
        type: TYPE.ORDER.PAYED,
        payload: {paymentToken: 'some-token'}
      }

      expect(reducer(state, action), 'to equal', {
        some: 'thing',
        paymentToken: 'some-token'
      })
    })
  })

  describe('handles TYPE.ORDER.STARTED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'thing'
      }

      const action = {
        type: TYPE.ORDER.STARTED
      }

      expect(reducer(state, action), 'to equal', {
        some: 'thing',
        orderInProgress: true
      })
    })
  })

  describe('handles TYPE.ORDER.ABORTED:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'thing'
      }

      const action = {
        type: TYPE.ORDER.ABORTED
      }

      expect(reducer(state, action), 'to equal', {
        some: 'thing',
        orderInProgress: false
      })
    })
  })
})
