import {
  open,
  close,
  openAddressModal,
  openFetchingPriceModal,
  openMaterialModal
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
          contentProps: 'some-content-props',
          isClosable: false
        })
      )
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        isClosable: false,
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
        isClosable: true,
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
        isClosable: true,
        contentType: null,
        contentProps: {}
      })
    })
  })

  describe('openAddressModal()', () => {
    it('opens address modal', () => {
      store.dispatch(openAddressModal())
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        isClosable: false,
        contentType: MODAL_TYPE.SHIPPING_ADDRESS,
        contentProps: {}
      })
    })

    it('opens fetch price modal', () => {
      store.dispatch(openFetchingPriceModal())
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        isClosable: false,
        contentType: MODAL_TYPE.FETCHING_PRICE,
        contentProps: {}
      })
    })
  })

  describe('openMaterialModal()', () => {
    it('opens material modal', () => {
      store.dispatch(openMaterialModal({
        materialId: 'some-material',
        finishGroupId: 'some-finish-group'
      }))
      expect(store.getState().modal, 'to equal', {
        isOpen: true,
        contentType: MODAL_TYPE.MATERIAL,
        contentProps: {
          materialId: 'some-material',
          finishGroupId: 'some-finish-group'
        }
      })
    })
  })
})
