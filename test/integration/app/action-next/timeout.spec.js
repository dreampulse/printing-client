import timeout from 'timeout-as-promise'
import * as timeoutAction from '../../../../src/app/action-next/timeout'
import {isTimeoutActive} from '../../../../src/app/selector/timeout'

import reducer from '../../../../src/app/reducer-next'

describe('timeout', () => {
  describe('action.start()', () => {
    describe('when used initially without a timeoutId', () => {
      const onEndActionCreator = () => ({type: 'SOME.ACTION'})
      let startAction
      let state

      beforeEach(() => {
        startAction = timeoutAction.start(onEndActionCreator, 42)
        state = reducer(undefined, startAction)
      })

      it('creates a unique timeoutId', () => {
        const otherStartAction = timeoutAction.start(onEndActionCreator)

        expect(startAction.payload.timeoutId, 'not to equal', otherStartAction.payload.timeoutId)
      })

      it('creates a unique timeoutCallId', () => {
        const otherStartAction = timeoutAction.start(onEndActionCreator)

        expect(
          startAction.payload.timeoutCallId,
          'not to equal',
          otherStartAction.payload.timeoutCallId
        )
      })

      it('triggers timeoutAction.end() with the timeoutCallid when the timeout resolves', () => {
        const timeoutCmd = findCmd(state, timeout, [42])
        const action = timeoutCmd.simulate({
          success: true,
          // The timeout library resolves with no result
          result: undefined
        })

        expect(action, 'to equal', timeoutAction.handleEnd(startAction.payload.timeoutCallId))
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns true for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be true')
        })
      })
    })

    describe('when used to debounce a timeout with a given timeoutId', () => {
      let startAction
      let debounceAction
      let state

      beforeEach(() => {
        const onEndActionCreator = () => ({type: 'SOME.ACTION'})

        startAction = timeoutAction.start(onEndActionCreator, 42)
        debounceAction = timeoutAction.start(onEndActionCreator, 42, startAction.payload.timeoutId)

        state = [startAction, debounceAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('re-uses the given timeoutId', () => {
        expect(startAction.payload.timeoutId, 'to equal', debounceAction.payload.timeoutId)
      })

      it('creates a unique timeoutCallId', () => {
        expect(
          startAction.payload.timeoutCallId,
          'not to equal',
          debounceAction.payload.timeoutCallId
        )
      })

      it('triggers timeoutAction.end() with the timeoutCallId from the second start action when the timeout resolves', () => {
        const timeoutCmd = findCmd(state, timeout, [42])
        const action = timeoutCmd.simulate({
          success: true,
          // The timeout library resolves with no result
          result: undefined
        })

        expect(action, 'to equal', timeoutAction.handleEnd(debounceAction.payload.timeoutCallId))
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns true for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), debounceAction.payload.timeoutId), 'to be true')
        })
      })
    })
  })

  describe('action.cancel()', () => {
    describe('when there is no active timeout with the given timeoutId', () => {
      it('does not change the state', () => {
        // We need to initialize the state with an init action in order to get an initialized state
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(reducer(stateBefore, timeoutAction.cancel('some-timeout-id')))

        expect(stateBefore, 'to be', stateAfter)
      })
    })

    describe('when there is an active timeout with the given timeoutId', () => {
      let startAction
      let cancelAction
      let state

      beforeEach(() => {
        const onEndActionCreator = () => ({type: 'SOME.ACTION'})

        startAction = timeoutAction.start(onEndActionCreator, 42)
        cancelAction = timeoutAction.cancel(startAction.payload.timeoutId)

        state = [startAction, cancelAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('throws no error when dispatched multiple times', () => {
        expect(
          () =>
            [cancelAction, timeoutAction.cancel(startAction.payload.timeoutId)].reduce(
              (currentState, action) => reducer(getModel(currentState), action),
              getModel(state)
            ),
          'not to throw'
        )
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns false for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be false')
        })
      })
    })
  })

  describe('action.handleEnd()', () => {
    const onEndAction = {type: 'SOME.ACTION'}
    let startAction
    let handleEndAction

    beforeEach(() => {
      startAction = timeoutAction.start(() => onEndAction, 42)
      handleEndAction = timeoutAction.handleEnd(startAction.payload.timeoutCallId)
    })

    describe('when the timeout has neither been cancelled nor debounced', () => {
      let state

      beforeEach(() => {
        state = [startAction, handleEndAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('triggers the given onEndAction returned by the onEndActionCreator', () => {
        expect(findAction(state, onEndAction), 'to be truthy')
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns false for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be false')
        })
      })
    })

    describe('when the timeout has been cancelled', () => {
      let state

      beforeEach(() => {
        const cancelAction = timeoutAction.cancel(startAction.payload.timeoutId)

        state = [startAction, cancelAction, handleEndAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('does not trigger the given onEndAction returned by the onEndActionCreator', () => {
        expect(findAction(state, onEndAction), 'to be falsy')
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns false for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be false')
        })
      })
    })

    describe('when the timeout has been debounced', () => {
      let state

      beforeEach(() => {
        const debounceAction = timeoutAction.start(
          () => ({type: 'OTHER.ACTION'}),
          4242,
          startAction.payload.timeoutId
        )

        state = [startAction, debounceAction, handleEndAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('does not trigger the first onEndAction', () => {
        expect(findAction(state, onEndAction), 'to be falsy')
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns true for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be true')
        })
      })
    })
  })

  describe('selector.isTimeoutActive()', () => {
    let state

    beforeEach(() => {
      const someInitAction = {}

      state = reducer(undefined, someInitAction)
    })

    it('returns false for an unknown timeoutId', () => {
      const startAction = timeoutAction.start(Function.prototype, 42)

      expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be false')
    })
  })

  describe('timeout-as-promise sanity check', () => {
    it('should resolve after 0ms or more when called with 0', async () => {
      const before = Date.now()
      await timeout(0)
      const now = Date.now()

      expect(now - before, 'to be greater than', -1)
    })

    it('should resolve after 42ms or more when called with 42', async () => {
      const before = Date.now()
      await timeout(42)
      const now = Date.now()

      expect(now - before, 'to be greater than', 41)
    })
  })
})
