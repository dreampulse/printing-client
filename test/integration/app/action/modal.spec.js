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
          title: 'some-title',
          contentFactory: 'some-contentFactory',
          contentProps: 'some-contentProps',
          contentModifiers: 'some-contentModifiers'
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        title: 'some-title',
        contentFactory: 'some-contentFactory',
        contentProps: 'some-contentProps',
        contentModifiers: 'some-contentModifiers'
      })
    })

    it('works with default parameters', async () => {
      store.dispatch(
        open({
          title: 'some-title',
          contentFactory: 'some-contentFactory'
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        title: 'some-title',
        contentFactory: 'some-contentFactory',
        contentProps: {},
        contentModifiers: []
      })
    })
  })

  describe('close()', () => {
    it('works', async () => {
      store.dispatch(close())
      expect(store.getState().modal, 'to equal', {
        isOpen: false,
        title: null,
        contentFactory: null,
        contentProps: {},
        contentModifiers: []
      })
    })
  })
})
