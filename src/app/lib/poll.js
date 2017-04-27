import debounce from 'lodash/debounce'
import uniqueId from 'lodash/uniqueId'

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

export const poll = (name, pollCallback) => {
  const callId = uniqueId()
  initState(name, callId)

  return new Promise((resolve, reject) => {
    const runPoll = async () => {
      const state = getState(name)

      if (!state) {
        reject(new Error(`Polling loop stopped with name ${name}!`))
        return
      }

      // When callId changed stop this polling loop
      if (callId !== state.callId) {
        reject(new Error(`Polling loop overwritten by another call with the same name ${name}!`))
        return
      }

      const shouldContinueWithPolling = state.countdown >= 0
      if (shouldContinueWithPolling) {
        state.countdown -= 1
        const isComplete = await pollCallback()
        if (isComplete) {
          // Done polling
          resolve()
        } else {
          setTimeout(runPoll, config.pollingInverval)
        }
      } else {
        // Give up polling
        reject(new Error(`Polling timeout reached with name ${name}!`))
      }
    }

    runPoll()  // Start initial polling
  })
}

export const stopPoll = (name) => {
  deleteState(name)
}

// TODO write our own debounce function which supports promises
export const debouncedPoll = (name, pollCallback) => {
  if (debouncedPolls[name]) {
    return debouncedPolls[name](name, pollCallback)
  }

  const debouncedFunc = debounce(
    poll,
    config.pollingDebouncedWait
  )
  debouncedPolls[name] = debouncedFunc

  return debouncedFunc(name, pollCallback)
}

export const resetPollState = () => {
  polls = {}
  debouncedPolls = {}
}
