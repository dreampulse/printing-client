// @flow

import type {Action, MaterialGroup, Location} from '../type-next'

type InitAction = Action<'CORE.INIT', void>
type UpdateMaterialGroupsAction = Action<
  'CORE.UPDATE_MATERIAL_GROUPS',
  {materialGroups: Array<MaterialGroup>}
>
type UpdateLocationAction = Action<'CORE.UPDATE_LOCATION', {location: Location}>
type UpdateCurrencyAction = Action<'CORE.UPDATE_CURRENCY', {currency: string}>
type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>

export type CoreAction =
  | InitAction
  | UpdateMaterialGroupsAction
  | UpdateLocationAction
  | UpdateCurrencyAction
  | FatalErrorAction

export const init = (): InitAction => ({
  type: 'CORE.INIT',
  payload: undefined
})

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  payload: {materialGroups}
})

export const updateLocation = (location: Location): UpdateLocationAction => ({
  type: 'CORE.UPDATE_LOCATION',
  payload: {location}
})

export const updateCurrency = (currency: string): UpdateCurrencyAction => ({
  type: 'CORE.UPDATE_CURRENCY',
  payload: {currency}
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})
