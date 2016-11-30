import $reducer from '../../../../src/app/reducer/app'
import TYPE from '../../../../src/app/type'

describe('app reducer', () => {
  let reducer

  beforeEach(() => {
    reducer = $reducer({})
  })

  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      isReady: false,
      isAutoSaving: false,
      constances: {}
    })
  })

  describe('handles APP.IS_READY:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        isReady: false,
        some: 'other-value'
      }

      action = {
        type: TYPE.APP.READY,
        payload: undefined
      }
    })

    it('sets isReady to true', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        isReady: true,
        some: 'other-value'
      })
    })
  })

  describe('handles APP.AUTO_SAVING:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        isAutoSaving: false,
        some: 'other-value'
      }

      action = {
        type: TYPE.APP.AUTO_SAVING,
        payload: undefined
      }
    })

    it('sets isAutoSaving to true', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        isAutoSaving: true,
        some: 'other-value'
      })
    })
  })

  describe('handles APP.AUTO_SAVED:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {
        isAutoSaving: true,
        some: 'other-value'
      }

      action = {
        type: TYPE.APP.AUTO_SAVED,
        payload: undefined
      }
    })

    it('sets isAutoSaving to false', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        isAutoSaving: false,
        some: 'other-value'
      })
    })
  })

  describe('handles APP.GOT_CONSTANCES:', () => {
    let stateBefore
    let action

    beforeEach(() => {
      stateBefore = {}

      action = {
        type: TYPE.APP.GOT_CONSTANCES,
        payload: 'some-constances'
      }
    })

    it('sets constances', () => {
      expect(reducer(stateBefore, action), 'to equal', {
        constances: 'some-constances'
      })
    })
  })
})
