import reducer from 'Reducer/price'
import TYPE from '../../../../src/app/action-type'

describe('Price reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      priceId: null,
      offers: null,
      printingServiceComplete: null,
      selectedOffer: null
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
        printingServiceComplete: null
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

    it('clones the offer before putting it in state', () => {
      expect(reducer(stateBefore, action).selectedOffer, 'not to be', action.payload.offer)
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
        printingServiceComplete: {some: 'printing-services'}
      })
    })
  })

  describe('handles TYPE.PRICE.TIMEOUT:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        some: 'thing',
        offers: [{some: 'offer-1'}, {some: 'offer-2', priceEstimated: true}],
        printingServiceComplete: {imateralize: false, shapeways: true}
      }

      action = {
        type: TYPE.PRICE.TIMEOUT
      }
    })

    it('sets expected properties', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        offers: [{some: 'offer-1'}],
        printingServiceComplete: {imateralize: true, shapeways: true}
      })
    })

    it('sets expected properties when offers and printingServiceComplete are null', () => {
      stateBefore.offers = null
      stateBefore.printingServiceComplete = null

      expect(reducer(stateBefore, action), 'to equal', {
        some: 'thing',
        offers: null,
        printingServiceComplete: null
      })
    })
  })
})
