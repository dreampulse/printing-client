import * as modalAction from '../../../../src/app/action-next/modal'
import {isModalOpen, selectModalConfig} from '../../../../src/app/selector'
import reducer from '../../../../src/app/reducer'

describe('modal', () => {
  describe('action.openPickLocation()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, modalAction.openPickLocation())
    })

    describe('selector.isModalOpen()', () => {
      it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
    })

    describe('selector.selectModalConfig()', () => {
      it('returns the expected modal config', () =>
        expect(selectModalConfig(getModel(state)), 'to satisfy', {
          isCloseable: false,
          contentType: 'PICK_LOCATION',
          contentProps: null
        }))
    })
  })

  describe('action.openModelViewer()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, modalAction.openModelViewer('Some model name'))
    })

    describe('selector.isModalOpen()', () => {
      it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
    })

    describe('selector.selectModalConfig()', () => {
      it('returns the expected modal config', () =>
        expect(selectModalConfig(getModel(state)), 'to satisfy', {
          isCloseable: true,
          contentType: 'MODEL_VIEWER',
          contentProps: {modelName: 'Some model name'}
        }))
    })
  })

  describe('action.openFatalError()', () => {
    let someError
    let state

    beforeEach(() => {
      someError = modalAction.openFatalError(someError)
      state = reducer(undefined, modalAction.openFatalError(someError))
    })

    describe('selector.isModalOpen()', () => {
      it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
    })

    describe('selector.selectModalConfig()', () => {
      it('returns the expected modal config', () =>
        expect(selectModalConfig(getModel(state)), 'to satisfy', {
          isCloseable: false,
          contentType: 'FATAL_ERROR',
          contentProps: {error: someError}
        }))
    })
  })

  describe('action.closeModal()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, modalAction.close())
    })

    describe('selector.isModalOpen()', () => {
      it('returns false', () => expect(isModalOpen(getModel(state)), 'to be', false))
    })

    describe('selector.selectModalConfig()', () => {
      it('equals null', () => expect(selectModalConfig(getModel(state)), 'to be', null))
    })
  })
})
