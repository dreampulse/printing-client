import reducer from 'Reducer/price'
import {AppError} from 'Lib/error'
import TYPE, {ERROR_TYPE} from '../../../../src/app/type'

describe('Price reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      priceId: null,
      offers: null,
      printingServiceComplete: null,
      selectedOffer: null,
      error: null
    })
  })

  describe('handles TYPE.PRICE.CLEAR_OFFERS:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing'
      }

      action = {
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }
    })

    it('clears expected properties', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        offers: null,
        printingServiceComplete: null,
        error: null
      })
    })
  })

  describe('handles TYPE.PRICE.SELECT_OFFER:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing'
      }

      action = {
        type: TYPE.PRICE.SELECT_OFFER,
        payload: {
          offer: {some: 'offer'}
        }
      }
    })

    it('sets selectedOffer', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        selectedOffer: {some: 'offer'}
      })
    })
  })

  describe('handles TYPE.PRICE.REQUESTED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing'
      }

      action = {
        type: TYPE.PRICE.REQUESTED,
        payload: {
          priceId: 'some-price-id'
        }
      }
    })

    it('sets priceId', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        priceId: 'some-price-id'
      })
    })
  })

  describe('handles TYPE.PRICE.RECEIVED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing'
      }

      action = {
        type: TYPE.PRICE.RECEIVED,
        payload: {
          price: {
            offers: ['some', 'offers'],
            printingServiceComplete: {some: 'printing-services'}
          }
        }
      }
    })

    it('sets expected properties', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        offers: ['some', 'offers'],
        printingServiceComplete: {some: 'printing-services'},
        error: null
      })
    })

    it('ignores POLL_OVERWRITTEN error', () => {
      const error = new AppError(ERROR_TYPE.POLL_OVERWRITTEN)
      action.payload = error
      action.error = true

      expect(reducer(stateBefore, action), 'to equal', stateBefore)
    })

    it('sets error', () => {
      const error = new Error()
      action.payload = error
      action.error = true

      expect(reducer(stateBefore, action), 'to equal', {
        priceId: null,
        offers: null,
        printingServiceComplete: null,
        selectedOffer: null,
        error
      })
    })
  })
})
