// @flow

import type {Action, ConfigId} from '../type-next'

type ChooseAction = Action<'MATERIAL.CHOOSE', {ids: Array<ConfigId>}>

export type MaterialAction = ChooseAction

export const choose = (ids: Array<ConfigId>): MaterialAction => ({
  type: 'MATERIAL.CHOOSE',
  payload: {
    ids
  }
})
