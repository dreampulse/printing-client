// @flow

import type {Action, MaterialGroup, Features} from '../type-next'

type InitPayload = {
  featureFlags: Features
}
type InitAction = Action<'CORE.INIT', InitPayload>
type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>
type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>

export type CoreAction = InitAction | UpdateMaterialGroupsAction | FatalErrorAction

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  payload: materialGroups
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})

export const init = ({featureFlags}: InitPayload): InitAction => ({
  type: 'CORE.INIT',
  payload: {
    featureFlags
  }
})
