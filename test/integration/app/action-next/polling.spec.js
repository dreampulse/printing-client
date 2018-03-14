import * as pollingAction from '../../../../src/app/action-next/polling'
import * as pollingSelector from '../../../../src/app/selector/polling'
import reducer from '../../../../src/app/reducer'
import {POLLING_FAILED} from '../../../../src/app/lib/polling'

describe('polling', () => {
  describe('action.start()', () => {
    let onSuccessActionCreator
    let pollingFunction
    let pollingArgs
    let state
    let startAction

    beforeEach(() => {
      onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
      pollingFunction = () => {}
      pollingArgs = [42]
      startAction = pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42, 1)
      state = reducer(undefined, startAction)
    })

    it('creates a unique polling id', () => {
      const otherStartAction = pollingAction.start(
        pollingFunction,
        pollingArgs,
        onSuccessActionCreator,
        42
      )

      expect(startAction.payload.pollingId, 'not to equal', otherStartAction.payload.pollingId)
    })

    it('uses Infinity as maxRetries default', () => {
      expect(
        pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42).payload
          .maxRetries,
        'to be',
        Infinity
      )
    })

    it('triggers action.handleResult() when the pollingFunction resolves', () => {
      const pollingFunctionResult = {}
      const cmd = findCmd(state, pollingFunction, pollingArgs)
      const action = cmd.simulate({
        success: true,
        result: pollingFunctionResult
      })

      expect(
        action,
        'to equal',
        pollingAction.handleResult(startAction.payload.pollingId, pollingFunctionResult)
      )
    })

    describe('selector.isPollingActive()', () => {
      it('returns true for the given pollingId', () => {
        expect(
          pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
          'to be true'
        )
      })
    })
  })

  describe('action.handleResult()', () => {
    // Happens when the polling has been cancelled while we were waiting for the pollingFunction to resolve
    describe('when there is no active polling with the given pollingId', () => {
      it('does not change the state', () => {
        // We need to initialize the state with an init action in order to get an initialized state
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(
          reducer(stateBefore, pollingAction.handleResult('does-not-exist'))
        )

        expect(stateBefore, 'to be', stateAfter)
      })
    })

    describe('when there is an active polling with the given pollingId in POLLING state', () => {
      describe('when the polling succeeds', () => {
        let startAction
        let state

        beforeEach(() => {
          const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
          const pollingFunction = () => {}
          const pollingArgs = [42]
          const pollingResult = {}

          startAction = pollingAction.start(
            pollingFunction,
            pollingArgs,
            onSuccessActionCreator,
            42,
            1
          )

          const handleResultAction = pollingAction.handleResult(
            startAction.payload.pollingId,
            pollingResult
          )

          state = [startAction, handleResultAction].reduce(
            (currentState, action) => reducer(getModel(currentState), action),
            undefined
          )
        })

        it('triggers the action as returned by the onSuccessActionCreator', () => {
          expect(findAction(state, action => action.type === 'SOME.ACTION'), 'to be truthy')
        })

        describe('selector.isPollingActive()', () => {
          it('returns false for the given pollingId', () => {
            expect(
              pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
              'to be false'
            )
          })
        })
      })

      describe('when the polling fails and there are remaining retries', () => {
        let startAction
        let state

        beforeEach(() => {
          const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
          const pollingFunction = () => {}
          const pollingArgs = [42]

          startAction = pollingAction.start(
            pollingFunction,
            pollingArgs,
            onSuccessActionCreator,
            42,
            1
          )

          const handleResultAction = pollingAction.handleResult(
            startAction.payload.pollingId,
            POLLING_FAILED
          )

          state = [startAction, handleResultAction].reduce(
            (currentState, action) => reducer(getModel(currentState), action),
            undefined
          )
        })

        it('triggers a TIMEOUT.START action with the correct retry delay', () => {
          expect(
            findAction(
              state,
              action => action.type === 'TIMEOUT.START' && action.payload.delay === 42
            ),
            'to be truthy'
          )
        })

        it('triggers action.handleRetry() after the timeout exceeded', () => {
          const timeoutStartAction = findAction(
            state,
            action => action.type === 'TIMEOUT.START' && action.payload.delay === 42
          )
          const retryAction = timeoutStartAction.payload.onEndActionCreator()

          expect(
            retryAction,
            'to satisfy',
            pollingAction.handleRetry(startAction.payload.pollingId)
          )
        })

        describe('selector.isPollingActive()', () => {
          it('returns true for the given pollingId', () => {
            expect(
              pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
              'to be true'
            )
          })
        })
      })

      describe('when the polling failed and there are no remaining retries', () => {
        let startAction
        let state

        beforeEach(() => {
          const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
          const pollingFunction = () => {}
          const pollingArgs = [42]

          startAction = pollingAction.start(
            pollingFunction,
            pollingArgs,
            onSuccessActionCreator,
            42,
            0
          )

          const handleResultAction = pollingAction.handleResult(
            startAction.payload.pollingId,
            POLLING_FAILED
          )

          state = [startAction, handleResultAction].reduce(
            (currentState, action) => reducer(getModel(currentState), action),
            undefined
          )
        })

        it('does not trigger an action', () => {
          expect(findAction(state, _ => true), 'to be falsy')
        })

        describe('selector.isPollingActive()', () => {
          it('returns false for the given pollingId', () => {
            expect(
              pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
              'to be false'
            )
          })
        })
      })
    })
  })

  describe('action.handleRetry()', () => {
    let pollingFunction
    let pollingArgs
    let startAction
    let state

    beforeEach(() => {
      const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})

      pollingFunction = () => {}
      pollingArgs = [42]
      startAction = pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42, 1)

      const handleResultAction = pollingAction.handleResult(
        startAction.payload.pollingId,
        POLLING_FAILED
      )
      const handleRetryAction = pollingAction.handleRetry(startAction.payload.pollingId)

      state = [startAction, handleResultAction, handleRetryAction].reduce(
        (currentState, action) => reducer(getModel(currentState), action),
        undefined
      )
    })

    it('triggers action.handleResult() when the pollingFunction resolves', () => {
      const pollingFunctionResult = {}
      const cmd = findCmd(state, pollingFunction, pollingArgs)
      const action = cmd.simulate({
        success: true,
        result: pollingFunctionResult
      })

      expect(
        action,
        'to equal',
        pollingAction.handleResult(startAction.payload.pollingId, pollingFunctionResult)
      )
    })

    describe('selector.isPollingActive()', () => {
      it('returns true for the given pollingId', () => {
        expect(
          pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
          'to be true'
        )
      })
    })
  })

  describe('action.cancel()', () => {
    describe('when there is no active polling with the given pollingId', () => {
      it('does not change the state', () => {
        // We need to initialize the state with an init action in order to get an initialized state
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(reducer(stateBefore, pollingAction.cancel('does-not-exist')))

        expect(stateBefore, 'to be', stateAfter)
      })
    })

    describe('when there is an active polling with the given pollingId in POLLING state', () => {
      let startAction
      let state

      beforeEach(() => {
        const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
        const pollingFunction = () => {}
        const pollingArgs = [42]

        startAction = pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42)
        const cancelAction = pollingAction.cancel(startAction.payload.pollingId)

        state = [startAction, cancelAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      describe('selector.isPollingActive()', () => {
        it('returns false for the given pollingId', () => {
          expect(
            pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
            'to be false'
          )
        })
      })
    })

    describe('when there is an active polling with the given pollingId in WAITING_FOR_NEXT_RETRY state', () => {
      let startAction
      let state

      beforeEach(() => {
        const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
        const pollingFunction = () => {}
        const pollingArgs = [42]

        startAction = pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42)
        const handleResultAction = pollingAction.handleResult(
          startAction.payload.pollingId,
          POLLING_FAILED
        )
        const cancelAction = pollingAction.cancel(startAction.payload.pollingId)

        state = [startAction, handleResultAction, cancelAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('triggers a TIMEOUT.CANCEL action with a timeoutId', () => {
        expect(
          findAction(
            state,
            action =>
              action.type === 'TIMEOUT.CANCEL' && typeof action.payload.timeoutId === 'string'
          ),
          'to be truthy'
        )
      })

      describe('selector.isPollingActive()', () => {
        it('returns false for the given pollingId', () => {
          expect(
            pollingSelector.isPollingActive(getModel(state), startAction.payload.pollingId),
            'to be false'
          )
        })
      })
    })
  })

  describe('selector.isPollingActive()', () => {
    let state

    beforeEach(() => {
      const someInitAction = {}

      state = reducer(undefined, someInitAction)
    })

    it('returns false for an unknown pollingId', () => {
      const startAction = pollingAction.start(Function.prototype, [], Function.prototype, 42)

      expect(
        pollingSelector.isPollingActive(getModel(state), startAction.payload.polingId),
        'to be false'
      )
    })
  })
})
