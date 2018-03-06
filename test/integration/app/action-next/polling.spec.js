import * as pollingAction from '../../../../src/app/action-next/polling'
import * as pollingSelector from '../../../../src/app/selector/polling'
import {PollingFunctionFailSignal} from '../../../../src/app/lib/error'
import reducer from '../../../../src/app/reducer'

describe('polling', () => {
  describe('action.start()', () => {
    const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
    const pollingFunction = () => {}
    const pollingArgs = [42]
    let state
    let startAction

    beforeEach(() => {
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

    it('triggers action.handleSuccess() when the pollingFunction resolves', () => {
      const pollingFunctionResult = {}
      const cmd = findCmd(state, pollingFunction, pollingArgs)
      const action = cmd.simulate({
        success: true,
        result: pollingFunctionResult
      })

      expect(
        action,
        'to equal',
        pollingAction.handleSuccess(startAction.payload.pollingId, pollingFunctionResult)
      )
    })

    it('triggers action.handleFail() when the pollingFunction rejects', () => {
      const error = new Error('Some error')
      const cmd = findCmd(state, pollingFunction, pollingArgs)
      const action = cmd.simulate({
        success: false,
        result: error
      })

      expect(action, 'to equal', pollingAction.handleFail(startAction.payload.pollingId, error))
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

  describe('action.handleSuccess()', () => {
    // Happens when the polling has been cancelled while we were waiting for the pollingFunction to resolve
    describe('when there is no active polling with the given pollingId', () => {
      it('does not change the state', () => {
        // We need to initialize the state with an init action in order to get an initialized state
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(
          reducer(stateBefore, pollingAction.handleSuccess('does-not-exist'))
        )

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
        const pollingResult = {}

        startAction = pollingAction.start(
          pollingFunction,
          pollingArgs,
          onSuccessActionCreator,
          42,
          1
        )
        const handleSuccessAction = pollingAction.handleSuccess(
          startAction.payload.pollingId,
          pollingResult
        )

        state = [startAction, handleSuccessAction].reduce(
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
  })

  describe('action.handleFail()', () => {
    // Happens when the polling has been cancelled while we were waiting for the pollingFunction to resolve
    describe('when there is no active polling with the given pollingId', () => {
      it('does not change the state', () => {
        // We need to initialize the state with an init action in order to get an initialized state
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(
          reducer(
            stateBefore,
            pollingAction.handleFail(
              'does-not-exist',
              new PollingFunctionFailSignal('Some fail signal')
            )
          )
        )

        expect(stateBefore, 'to be', stateAfter)
      })
    })

    describe('when there is an active polling with the given pollingId in POLLING state and remaining retries', () => {
      let startAction
      let state

      beforeEach(() => {
        const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
        const pollingFunction = () => {}
        const pollingArgs = [42]
        const remainingRetries = 1
        const error = new PollingFunctionFailSignal('Some fail signal')

        startAction = pollingAction.start(
          pollingFunction,
          pollingArgs,
          onSuccessActionCreator,
          42,
          remainingRetries
        )
        const handleFailAction = pollingAction.handleFail(startAction.payload.pollingId, error)

        state = [startAction, handleFailAction].reduce(
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

        expect(retryAction, 'to satisfy', pollingAction.handleRetry(startAction.payload.pollingId))
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

    describe('when the error is not a PollingFunctionFailSignal', () => {
      it('throws the error', () => {
        const error = new Error('Some error')

        expect(
          () => reducer({}, pollingAction.handleFail('some-polling-id', error)),
          'to throw',
          error
        )
      })
    })

    describe('when there is an active polling with the given pollingId in POLLING state and no remaining retries', () => {
      let startAction
      let state

      beforeEach(() => {
        const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})
        const pollingFunction = () => {}
        const pollingArgs = [42]
        const error = new PollingFunctionFailSignal('Some fail signal')
        const remainingRetries = 0

        startAction = pollingAction.start(
          pollingFunction,
          pollingArgs,
          onSuccessActionCreator,
          42,
          remainingRetries
        )

        const handleFailAction = pollingAction.handleFail(startAction.payload.pollingId, error)

        state = [startAction, handleFailAction].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
      })

      it('does not trigger TIMEOUT.START', () => {
        expect(findAction(state, action => action.type === 'TIMEOUT.START'), 'to be falsy')
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

  describe('action.handleRetry()', () => {
    const pollingFunction = () => {}
    const pollingArgs = [42]
    let startAction
    let state

    beforeEach(() => {
      const onSuccessActionCreator = () => ({type: 'SOME.ACTION'})

      startAction = pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42, 1)
      const handleFailAction = pollingAction.handleFail(
        startAction.payload.pollingId,
        new PollingFunctionFailSignal('Some fail signal')
      )
      const handleRetryAction = pollingAction.handleRetry(startAction.payload.pollingId)

      state = [startAction, handleFailAction, handleRetryAction].reduce(
        (currentState, action) => reducer(getModel(currentState), action),
        undefined
      )
    })

    it('triggers action.handleSuccess() when the pollingFunction resolves', () => {
      const pollingFunctionResult = {}
      const cmd = findCmd(state, pollingFunction, pollingArgs)
      const action = cmd.simulate({
        success: true,
        result: pollingFunctionResult
      })

      expect(
        action,
        'to equal',
        pollingAction.handleSuccess(startAction.payload.pollingId, pollingFunctionResult)
      )
    })

    it('triggers action.handleFail() when the pollingFunction rejects', () => {
      const error = new Error('Some error')
      const cmd = findCmd(state, pollingFunction, pollingArgs)
      const action = cmd.simulate({
        success: false,
        result: error
      })

      expect(action, 'to equal', pollingAction.handleFail(startAction.payload.pollingId, error))
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
        const error = new PollingFunctionFailSignal('Some fail signal')

        startAction = pollingAction.start(pollingFunction, pollingArgs, onSuccessActionCreator, 42)
        const handleFailAction = pollingAction.handleFail(startAction.payload.pollingId, error)
        const cancelAction = pollingAction.cancel(startAction.payload.pollingId)

        state = [startAction, handleFailAction, cancelAction].reduce(
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
