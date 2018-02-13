import timeout from 'timeout-as-promise'
import * as timeoutAction from '../../../../src/app/action-next/timeout'
import {isTimeoutActive} from '../../../../src/app/selector/timeout'

import reducer from '../../../../src/app/reducer'

describe('timeout', () => {
  describe('action.start()', () => {
    const onEndActionCreator = () => ({type: 'SOME.ACTION'})
    let startAction

    beforeEach(() => {
      startAction = timeoutAction.start(onEndActionCreator, 42)
    })

    it('creates a unique timeout id', () => {
      const otherStartAction = timeoutAction.start(onEndActionCreator)

      expect(startAction.payload.timeoutId, 'not to equal', otherStartAction.payload.timeoutId)
    })

    describe('when there is no active timeout with the given timeoutId', () => {
      let state

      beforeEach(() => {
        state = reducer(undefined, startAction)
      })

      it('triggers timeoutAction.end() when the timeout resolves', () => {
        const timeoutCmd = findCmd(state, timeout, [42])
        const action = timeoutCmd.simulate({
          success: true,
          // The timeout library resolves with no result
          result: undefined
        })

        expect(action, 'to equal', timeoutAction.end(startAction))
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns true for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be true')
        })
      })
    })

    // May happen if someone dispatches the same action twice
    describe('when there is an active timeout with the given timeoutId', () => {
      it('throws an error', () => {
        expect(
          () =>
            [startAction, startAction].reduce(
              (currentState, action) => reducer(getModel(currentState), action),
              undefined
            ),
          'to throw',
          `Error in start(): There is already an active timeout with id ${startAction.payload
            .timeoutId}`
        )
      })
    })
  })

  describe('action.cancel()', () => {
    const onEndActionCreator = () => ({type: 'SOME.ACTION'})
    let startAction

    beforeEach(() => {
      startAction = timeoutAction.start(onEndActionCreator, 42)
    })

    describe('when there is no active timeout with the given timeoutId', () => {
      it('throws no error', () => {
        expect(() => reducer(undefined, timeoutAction.cancel('does-not-exist')), 'not to throw')
      })
    })

    describe('when there is an active timeout with the given timeoutId', () => {
      let cancelAction
      let state

      beforeEach(() => {
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

  describe('action.debounce()', () => {
    describe('when there is no active timeout with the given timeoutId', () => {
      it('throws an error', () => {
        expect(
          () => reducer(undefined, timeoutAction.debounce('does-not-exist')),
          'to throw',
          'Error in debounce(): There is no active timeout with id does-not-exist'
        )
      })
    })

    describe('when there is an active timeout with the given timeoutId', () => {
      const onEndActionCreator = () => ({type: 'SOME.ACTION'})
      let startAction
      let debounceAction
      let state

      beforeEach(() => {
        startAction = timeoutAction.start(onEndActionCreator, 42)
        debounceAction = timeoutAction.debounce(startAction.payload.timeoutId, 4242)

        state = [startAction, debounceAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('triggers timeoutAction.end() when the new timeout resolves', () => {
        const timeoutCmd = findCmd(state, timeout, [4242])
        const action = timeoutCmd.simulate({
          success: true,
          // The timeout library resolves with no result
          result: undefined
        })

        expect(action, 'to equal', timeoutAction.end(debounceAction))
      })

      describe('selector.isTimeoutActive()', () => {
        it('returns true for the given timeoutId', () => {
          expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be true')
        })
      })
    })
  })

  describe('action.end()', () => {
    describe('when there is no active timeout with the given timeoutId', () => {
      it('throws no error', () => {
        expect(() => reducer(undefined, timeoutAction.cancel('does-not-exist')), 'not to throw')
      })
    })

    describe('when there is an active timeout with the given timeoutId', () => {
      const onEndActionCreator = () => ({type: 'SOME.ACTION'})
      let startAction

      beforeEach(() => {
        startAction = timeoutAction.start(onEndActionCreator, 42)
      })

      describe('when the timeout has neither been cancelled nor debounced', () => {
        let state

        beforeEach(() => {
          const endAction = timeoutAction.end(startAction)

          state = [startAction, endAction].reduce(
            (currentState, action) => reducer(getModel(currentState), action),
            undefined
          )
        })

        it('triggers the given onEndAction returned by the onEndActionCreator', () => {
          const onEndAction = onEndActionCreator()

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
          const endAction = timeoutAction.end(startAction)

          state = [startAction, cancelAction, endAction].reduce(
            (currentState, action) => reducer(getModel(currentState), action),
            undefined
          )
        })

        it('does not trigger the given onEndAction returned by the onEndActionCreator', () => {
          const onEndAction = onEndActionCreator()

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
          startAction = timeoutAction.start(onEndActionCreator, 42)
          const debounceAction = timeoutAction.debounce(startAction.payload.timeoutId, 4242)
          const endAction = timeoutAction.end(startAction)

          state = [startAction, debounceAction, endAction].reduce(
            (currentState, action) => reducer(getModel(currentState), action),
            undefined
          )
        })

        it('does not trigger the given onEndAction returned by the original onEndActionCreator', () => {
          const onEndAction = onEndActionCreator()

          expect(findAction(state, onEndAction), 'to be falsy')
        })

        describe('selector.isTimeoutActive()', () => {
          it('returns true for the given timeoutId', () => {
            expect(isTimeoutActive(getModel(state), startAction.payload.timeoutId), 'to be true')
          })
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
