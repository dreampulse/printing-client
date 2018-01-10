import reducer from '../../../../src/app/reducer/configuration'
import TYPE from '../../../../src/app/action-type'

describe('Configuration reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {}), 'to equal', {
      configurationId: null,
      isDirectSales: false
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
        configurationId: 'some-configuration-id',
        isDirectSales: false
      })
    })

    it('sets expected state in direct sales case', () => {
      const state = {
        some: 'thing'
      }

      const action = {
        type: TYPE.DIRECT_SALES.RESTORE_CONFIGURATION,
        payload: {
          _id: 'some-configuration-id',
          materialConfigId: 'some-material-config-id'
        }
      }

      expect(reducer(state, action), 'to equal', {
        some: 'thing',
        configurationId: 'some-configuration-id',
        isDirectSales: true
      })
    })
  })
})
