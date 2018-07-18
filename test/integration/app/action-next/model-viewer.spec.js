import config from '../../../../config'
import * as modelViewerAction from '../../../../src/app/action-next/model-viewer'
import * as modalAction from '../../../../src/app/action-next/modal'
import * as pollingAction from '../../../../src/app/action-next/polling'
import {isModelViewerOpen, selectSceneId} from '../../../../src/app/selector/model-viewer'
import {pollingFunction} from '../../../../src/app/lib/polling'

import reducer from '../../../../src/app/reducer-next'

describe('model-viewer', () => {
  describe('action.open()', () => {
    let openAction
    let state

    beforeEach(() => {
      openAction = modelViewerAction.open({modelId: 'some-model-id', fileName: 'some-file-name'})
      state = reducer(undefined, openAction)
    })

    it('triggers modalAction.openModelViewer() with the given fileName and pollingAction.start() with the given modelId', () => {
      const pollingStartAction = pollingAction.start(
        expect.it('to equal', pollingFunction.getModelSceneId),
        ['some-model-id'],
        modelViewerAction.handleSceneId,
        config.pollingInterval
      )

      pollingStartAction.payload.pollingId = expect.it(() => {})

      expect(
        findCmd(
          state,
          Cmd.list([
            Cmd.action(modalAction.openModelViewer('some-file-name')),
            Cmd.action(pollingStartAction)
          ])
        ),
        'to be truthy'
      )
    })

    describe('selector.isModelViewerOpen()', () => {
      it('returns true', () => {
        expect(isModelViewerOpen(getModel(state)), 'to be true')
      })
    })

    describe('selector.selectSceneId()', () => {
      it('returns null', () => {
        expect(selectSceneId(getModel(state)), 'to be null')
      })
    })
  })

  describe('action.handleSceneId()', () => {
    let handleSceneIdAction
    let state

    beforeEach(() => {
      handleSceneIdAction = modelViewerAction.handleSceneId('some-scene-id')
      state = reducer(undefined, handleSceneIdAction)
    })

    describe('selector.selectSceneId()', () => {
      it('returns the given scene id', () => {
        expect(selectSceneId(getModel(state)), 'to be', 'some-scene-id')
      })
    })
  })

  describe('action.close()', () => {
    describe('when the model viewer was not open', () => {
      it('does not change the state', () => {
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(reducer(stateBefore, modelViewerAction.close()))

        expect(stateBefore, 'to be', stateAfter)
      })
    })

    describe('when the model viewer was open', () => {
      let closeAction
      let state

      beforeEach(() => {
        const openAction = modelViewerAction.open('some-model-id')
        closeAction = modelViewerAction.close()
        state = [openAction, closeAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('triggers modalAction.close() and pollingAction.cancel() with a polling id', () => {
        const pollingCancelAction = pollingAction.cancel(
          expect.it(pollingId => {
            expect(pollingId, 'to be truthy')
            expect(pollingId, 'to be a string')
          })
        )

        expect(
          findCmd(
            state,
            Cmd.list([Cmd.action(modalAction.close()), Cmd.action(pollingCancelAction)])
          ),
          'to be truthy'
        )
      })

      describe('selector.isModelViewerOpen()', () => {
        it('returns false', () => {
          expect(isModelViewerOpen(getModel(state)), 'to be false')
        })
      })

      describe('selector.selectSceneId()', () => {
        it('returns null', () => {
          expect(selectSceneId(getModel(state)), 'to be null')
        })
      })
    })
  })

  describe('selector.isModelViewerOpen()', () => {
    let state

    beforeEach(() => {
      const someInitAction = {}

      state = reducer(undefined, someInitAction)
    })

    it('returns false', () => {
      expect(isModelViewerOpen(getModel(state)), 'to be false')
    })
  })

  describe('selector.selectSceneId()', () => {
    let state

    beforeEach(() => {
      const someInitAction = {}

      state = reducer(undefined, someInitAction)
    })

    it('returns null', () => {
      expect(selectSceneId(getModel(state)), 'to be null')
    })
  })
})
