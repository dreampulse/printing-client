// @flow

import type {Action} from '../type-next'

type InitInitAction = Action<'INIT.INIT', void>
export type InitAction = InitInitAction

export const init = (): InitInitAction => ({
  type: 'INIT.INIT',
  payload: undefined
})
