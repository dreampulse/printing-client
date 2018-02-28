// @flow

import type {Action, ConfigId, MaterialId, MaterialGroupId} from '../type-next'

type ChooseAction = Action<'MATERIAL.CHOOSE', {ids: Array<ConfigId>}>

export type MaterialAction = ChooseAction

export const choose = (ids: Array<ConfigId>): ChooseAction => ({
  type: 'MATERIAL.CHOOSE',
  payload: {
    ids
  }
})

export const selectMaterialGroup = (id: MaterialGroupId) => ({
  type: 'MATERIAL.SELECT.GROUP'
})
