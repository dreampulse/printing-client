import * as modal from 'App/action-next/modal'
import {isModalOpen, selectModalConfig} from 'App/selector'

describe('modal action', () => {
  describe('openModal()', () => {
    const contentArgs = {}
    ;[
      [isModalOpen, true],
      [
        selectModalConfig,
        {
          isCloseable: false,
          content: 'CONTENT_TYPE',
          contentArgs
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(
          modal.openModal({
            isCloseable: false,
            content: 'CONTENT_TYPE',
            contentArgs
          })
        )
        expect(selector(state), 'to equal', expected)
      })
    })
  })

  describe('openFatalErrorModal()', () => {
    const error = new Error('Fatal error')
    ;[
      [isModalOpen, true],
      [
        selectModalConfig,
        {
          isCloseable: false,
          content: 'FATAL_ERROR',
          contentArgs: {error}
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(modal.openFatalErrorModal(error))
        expect(selector(state), 'to equal', expected)
      })
    })
  })

  describe('openPickLocationModal()', () => {
    ;[
      [isModalOpen, true],
      [
        selectModalConfig,
        {
          isCloseable: false,
          content: 'PICK_LOCATION',
          contentArgs: null
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(modal.openPickLocationModal())
        expect(selector(state), 'to equal', expected)
      })
    })
  })

  describe('closeModal()', () => {
    ;[
      [isModalOpen, false],
      [
        selectModalConfig,
        {
          isCloseable: true,
          content: null,
          contentArgs: null
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(modal.closeModal())
        expect(selector(state), 'to equal', expected)
      })
    })
  })
})
