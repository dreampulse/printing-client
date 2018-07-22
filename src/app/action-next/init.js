// @flow

import type {Action, Features} from '../type-next'

type InitInitAction = Action<'INIT.INIT', void>
type InitFeatureFlagsAction = Action<'INIT.FEATURE_FLAGS', Features>
export type InitAction = InitInitAction | InitFeatureFlagsAction

export const init = (): InitInitAction => ({
  type: 'INIT.INIT',
  payload: undefined
})

export const initFeatureFlags = (payload: Features) => ({
  type: 'INIT.FEATURE_FLAGS',
  payload
})
