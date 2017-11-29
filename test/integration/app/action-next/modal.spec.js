import * as modal from 'App/action-next/modal'
import {isModalOpen, selectModalConfig} from 'App/selector'

describe('modal actions', () => {
  describe(modal.TYPE.OPEN_ADDRESS, () => {
    ;[
      [isModalOpen, true],
      [
        selectModalConfig,
        {
          isCloseable: false,
          content: /* <AddressModal /> */ null
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(modal.openAddress())
        expect(selector(state), 'to equal', expected)
      })
    })
  })

  describe(modal.TYPE.OPEN_FATAL_ERROR, () => {
    ;[
      [isModalOpen, true],
      [
        selectModalConfig,
        {
          isCloseable: false,
          content: /* <FatalErrorModal message={action.payload} /> */ null
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(modal.openFatalError('SOME_ERROR'))
        expect(selector(state), 'to equal', expected)
      })
    })
  })

  describe(modal.TYPE.CLOSE, () => {
    ;[
      [isModalOpen, false],
      [
        selectModalConfig,
        {
          isCloseable: true,
          content: null
        }
      ]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(modal.close())
        expect(selector(state), 'to equal', expected)
      })
    })
  })
})
