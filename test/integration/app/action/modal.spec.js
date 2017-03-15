import {
  open,
  close,
  openAddressModal
} from '../../../../src/app/action/modal'
import Store from '../../../../src/app/store'

import {MODAL_TYPE} from '../../../../src/app/type'

describe('Modal Integration Test', () => {
  let store

  beforeEach(() => {
    store = Store({})
  })

  describe('open()', () => {
    it('works with all parameters set', async () => {
      store.dispatch(
        open({
          contentType: 'some-content-type',
          contentProps: 'some-content-props'
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        contentType: 'some-content-type',
        contentProps: 'some-content-props'
      })
    })

    it('works with default parameters', async () => {
      store.dispatch(
        open({
          contentType: 'some-content-type'
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        contentType: 'some-content-type',
        contentProps: {}
      })
    })
  })

  describe('close()', () => {
    it('works', async () => {
      store.dispatch(close())
      expect(store.getState().modal, 'to equal', {
        isOpen: false,
        contentType: null,
        contentProps: {}
      })
    })
  })

  describe('opens individual modal', () => {
    it('opens address modal', () => {
      store.dispatch(openAddressModal())
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        contentType: MODAL_TYPE.SHIPPING_ADDRESS,
        contentProps: {}
      })
    })
  })
})
