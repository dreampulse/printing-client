// @flow

import type {Action} from '../type-next'

export const TYPE = {
  INIT: 'INIT.INIT'
}

type InitInitAction = Action<'INIT.INIT', void>
export type InitAction = InitInitAction

export const init = (): InitInitAction => ({
  type: TYPE.INIT,
  payload: undefined
})
