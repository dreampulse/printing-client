// @flow

import type {Action, MaterialGroup, UrlParams, Location, Features, Shipping, User} from '../type'

import type {UserResponse} from '../lib/printing-engine'

type InitPayload = {
  featureFlags: Features,
  urlParams: UrlParams
}

type InitAction = Action<'CORE.INIT', InitPayload>
type UpdateMaterialGroupsAction = Action<
  'CORE.UPDATE_MATERIAL_GROUPS',
  {materialGroups: Array<MaterialGroup>}
>
type UpdateLocationAction = Action<'CORE.UPDATE_LOCATION', {location: Location, force: boolean}>
type UpdateUnitAction = Action<'CORE.UPDATE_UNIT', {unit: string}>
type UpdateUseSameMaterialAction = Action<'CORE.UPDATE_USE_SAME_MATERIAL', boolean>
type UpdateCurrencyAction = Action<'CORE.UPDATE_CURRENCY', {currency: string, force: boolean}>
type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>
type UpdateShippingsAction = Action<'CORE.UPDATE_SHIPPINGS', Array<Shipping>>
type SaveUserAction = Action<'CORE.SAVE_USER', User>
type UserReceivedAction = Action<'CORE.USER_RECEIVED', UserResponse>
type ResetAction = Action<'CORE.RESET', void>

export type CoreAction =
  | InitAction
  | UpdateMaterialGroupsAction
  | UpdateLocationAction
  | UpdateUnitAction
  | UpdateCurrencyAction
  | FatalErrorAction
  | UpdateShippingsAction
  | SaveUserAction
  | UserReceivedAction
  | ResetAction
  | UpdateUseSameMaterialAction

export const init = ({featureFlags, urlParams}: InitPayload): InitAction => ({
  type: 'CORE.INIT',
  payload: {
    featureFlags,
    urlParams
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

export const updateUnit = (unit: string): UpdateUnitAction => ({
  type: 'CORE.UPDATE_UNIT',
  payload: {unit}
})

export const updateUseSameMaterial = (useSameMaterial: boolean): UpdateUseSameMaterialAction => ({
  type: 'CORE.UPDATE_USE_SAME_MATERIAL',
  payload: useSameMaterial
})

export const updateCurrency = (currency: string, force: boolean = false): UpdateCurrencyAction => ({
  type: 'CORE.UPDATE_CURRENCY',
  payload: {currency, force}
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})

export const updateShippings = (payload: Array<Shipping>): UpdateShippingsAction => ({
  type: 'CORE.UPDATE_SHIPPINGS',
  payload
})

export const saveUser = (user: User): SaveUserAction => ({
  type: 'CORE.SAVE_USER',
  payload: user
})

export const userReceived = (payload: UserResponse): UserReceivedAction => ({
  type: 'CORE.USER_RECEIVED',
  payload
})

export const reset = (): ResetAction => ({
  type: 'CORE.RESET',
  payload: undefined
})
