import {open, close} from '../../../../src/app/action/modal'
import Store from '../../../../src/app/store'

describe('Modal Integration Test', () => {
  let store

  beforeEach(() => {
    store = Store({})
  })

  describe('open()', () => {
    it('works with all parameters set', async () => {
      store.dispatch(
        open({
          contentFactory: 'some-contentFactory',
          contentProps: 'some-contentProps'
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        contentFactory: 'some-contentFactory',
        contentProps: 'some-contentProps'
      })
    })

    it('works with default parameters', async () => {
      store.dispatch(
        open({
          contentFactory: 'some-contentFactory'
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        contentFactory: 'some-contentFactory',
        contentProps: {}
      })
    })
  })

  describe('close()', () => {
    it('works', async () => {
      store.dispatch(close())
      expect(store.getState().modal, 'to equal', {
        isOpen: false,
        contentFactory: null,
        contentProps: {}
      })
    })
  })
})
