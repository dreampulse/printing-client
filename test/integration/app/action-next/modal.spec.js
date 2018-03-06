import * as modalAction from '../../../../src/app/action-next/modal'
import {isModalOpen, selectModalConfig} from '../../../../src/app/selector'
import reducer from '../../../../src/app/reducer'

describe('modal', () => {
  const someError = new Error('some-error')
  ;[
    {
      description: 'action.openPickLocation()',
      action: modalAction.openPickLocation(),
      expectedModalConfig: {isCloseable: false, contentType: 'PICK_LOCATION', contentProps: null}
    },
    {
      description: 'action.openModelViewer()',
      action: modalAction.openModelViewer('some-model-id'),
      expectedModalConfig: {
        isCloseable: true,
        contentType: 'MODEL_VIEWER',
        contentProps: {modelId: 'some-model-id'}
      }
    },
    {
      description: 'action.openFatalError()',
      action: modalAction.openFatalError(someError),
      expectedModalConfig: {
        isCloseable: false,
        contentType: 'FATAL_ERROR',
        contentProps: {error: someError}
      }
    }
  ].forEach(({description, action, expectedModalConfig}) => {
    describe(description, () => {
      const stringifiedModalConfig = JSON.stringify(expectedModalConfig).slice(1, -1)
      let state

      beforeEach(() => {
        state = reducer(undefined, action)
      })

      describe('selector.isModalOpen()', () => {
        it('returns true', () => expect(isModalOpen(getModel(state)), 'to be', true))
      })

      describe('selector.selectModalConfig()', () => {
        it(`satisfies ${stringifiedModalConfig}`, () =>
          expect(selectModalConfig(getModel(state)), 'to satisfy', expectedModalConfig))
      })
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
