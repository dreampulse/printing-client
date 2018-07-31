// @flow

import type {Action, MaterialGroup, Location, Features, Shipping} from '../type-next'

type InitPayload = {
  featureFlags: Features
}

type InitAction = Action<'CORE.INIT', InitPayload>
type UpdateMaterialGroupsAction = Action<
  'CORE.UPDATE_MATERIAL_GROUPS',
  {materialGroups: Array<MaterialGroup>}
>
type UpdateLocationAction = Action<'CORE.UPDATE_LOCATION', {location: Location, force: boolean}>
type UpdateCurrencyAction = Action<'CORE.UPDATE_CURRENCY', {currency: string, force: boolean}>
type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>
type UpdateShippingAction = Action<'CORE.UPDATE_SHIPPING', Array<Shipping>>

export type CoreAction =
  | InitAction
  | UpdateMaterialGroupsAction
  | UpdateLocationAction
  | UpdateCurrencyAction
  | FatalErrorAction
  | UpdateShippingAction

export const init = ({featureFlags}: InitPayload): InitAction => ({
  type: 'CORE.INIT',
  payload: {
    featureFlags
  }
})

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  payload: {materialGroups}
})

export const updateLocation = (
  location: Location,
  force: boolean = false
): UpdateLocationAction => ({
  type: 'CORE.UPDATE_LOCATION',
  payload: {location, force}
})

export const updateCurrency = (currency: string, force: boolean = false): UpdateCurrencyAction => ({
  type: 'CORE.UPDATE_CURRENCY',
  payload: {currency, force}
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})

export const updateShipping = (payload: Array<Shipping>) => ({
  type: 'CORE.UPDATE_SHIPPING',
  payload
})
