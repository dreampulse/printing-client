import reducer from 'Reducer/configuration'
import TYPE from '../../../../src/app/type'

describe('Configuration reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      configurationId: null
    })
  })

  describe('handles TYPE.DIRECT_SALES.RESTORE_CONFIGURATION:', () => {
    it('sets expected state', () => {
      const state = {
        some: 'thing'
      }

      const action = {
        type: TYPE.DIRECT_SALES.RESTORE_CONFIGURATION,
        payload: {_id: 'some-configuration-id'}
      }

      expect(reducer(state, action), 'to equal', {
        some: 'thing',
        configurationId: 'some-configuration-id'
      })
    })
  })
})
