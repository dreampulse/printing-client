import debounce from 'debounce-promise'
import uniqueId from 'lodash/uniqueId'

import {AppError} from 'Lib/error'
import {ERROR_TYPE} from '../action-type'
import config from '../../../config'

// State
let polls = {}
let debouncedPolls = {}

const initState = (name, callId) => {
  polls[name] = {
    callId,
    countdown: config.pollingRetries
  }
}

const getState = name => (
  polls[name]
)

const deleteState = (name) => {
  delete polls[name]
}

export const poll = (
  name,
  pollCallback,
  initPollCallback = () => Promise.resolve()
) => {
  const callId = uniqueId()
  initState(name, callId)

  return new Promise((resolve, reject) => {
    const runPoll = async (initPayload) => {
      const state = getState(name)

      if (!state) {
        reject(new AppError(ERROR_TYPE.POLL_STOPPED, `Polling loop stopped with name ${name}!`))
        return
      }

      // When callId changed stop this polling loop
      if (callId !== state.callId) {
        reject(
          new AppError(
            ERROR_TYPE.POLL_OVERWRITTEN,
            `Polling loop overwritten by another call with the same name ${name}!`
          )
        )
        return
      }

      const shouldContinueWithPolling = state.countdown >= 0
      if (shouldContinueWithPolling) {
        state.countdown -= 1

        try {
          const isComplete = await pollCallback(initPayload)
          if (isComplete) {
            // Done polling
            resolve()
          } else {
            setTimeout(() => runPoll(initPayload), config.pollingInverval)
          }
        } catch (error) {
          reject(error)
        }
      } else {
        // Give up polling
        reject(new AppError(ERROR_TYPE.POLL_TIMEOUT, `Polling timeout reached with name ${name}!`))
      }
    }

    initPollCallback()
      .then(runPoll) // Start initial polling
      .catch(reject)
  })
}

export const stopPoll = (name) => {
  deleteState(name)
}

export const debouncedPoll = (name, pollCallback, initPollCallback) => {
  if (debouncedPolls[name]) {
    return debouncedPolls[name](name, pollCallback, initPollCallback)
  }

  const debouncedFunc = debounce(
    poll,
    config.pollingDebouncedWait
  )
  debouncedPolls[name] = debouncedFunc

  return debouncedFunc(name, pollCallback, initPollCallback)
}

export const resetPollState = () => {
  polls = {}
  debouncedPolls = {}
}
