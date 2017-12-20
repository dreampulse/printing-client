import * as modal from '../../../../src/app/action-next/modal'
import {isModalOpen, selectModalConfig} from '../../../../src/app/selector'
import reducer from '../../../../src/app/reducer'

describe('modal action', () => {
  describe('openModal()', () => {
    let modalConfiguration
    let state

    beforeEach(() => {
      modalConfiguration = {
        isCloseable: false,
        content: 'CONTENT_TYPE',
        contentProps: {}
      }
      state = reducer(undefined, modal.openModal(modalConfiguration))
    })

    describe('using isModalOpen() selector', () => {
      it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
    })

    describe('using selectModalConfig() selector', () => {
      it('returns the specified modal configuration', () =>
        expect(selectModalConfig(getModel(state)), 'to satisfy', modalConfiguration))
    })
  })

  describe('openFatalErrorModal()', () => {
    let error
    let state

    beforeEach(() => {
      error = new Error('Fatal error')
      state = reducer(undefined, modal.openFatalErrorModal(error))
    })

    describe('using isModalOpen() selector', () => {
      it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
    })

    describe('using selectModalConfig() selector', () => {
      it('returns the expected modal configuration', () =>
        expect(selectModalConfig(getModel(state)), 'to satisfy', {
          isCloseable: false,
          content: 'FATAL_ERROR',
          contentProps: {
            error
          }
        }))
    })
  })

  describe('openPickLocationModal()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, modal.openPickLocationModal())
    })

    describe('using isModalOpen() selector', () => {
      it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
    })

    describe('using selectModalConfig() selector', () => {
      it('returns the expected modal configuration', () =>
        expect(selectModalConfig(getModel(state)), 'to satisfy', {
          isCloseable: false,
          content: 'PICK_LOCATION',
          contentProps: null
        }))
    })
  })

  describe('closeModal()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, modal.closeModal())
    })

    describe('using isModalOpen() selector', () => {
      it('returns false', () => expect(isModalOpen(getModel(state)), 'to be', false))
    })
  })
})
