import {Action, MaterialGroup, UrlParams, Location, Features, Shipping, User} from '../type'

import {UserResponse} from '../lib/printing-engine'

export type InitPayload = {
  featureFlags: Features
  urlParams: UrlParams
  restoreSessionEnabled: boolean
}

export type InitAction = Action<'CORE.INIT', InitPayload>
export type InitContinueAction = Action<
  'CORE.INIT_CONTINUE',
  {materialGroups: MaterialGroup[]}
>
export type UpdateLocationAction = Action<
  'CORE.UPDATE_LOCATION',
  {location: Location; force: boolean}
>
export type UpdateUnitAction = Action<'CORE.UPDATE_UNIT', {unit: string}>
export type UpdateCurrencyAction = Action<
  'CORE.UPDATE_CURRENCY',
  {currency: string; force: boolean}
>
export type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>
export type UpdateShippingsAction = Action<'CORE.UPDATE_SHIPPINGS', Shipping[]>
export type SaveUserAction = Action<'CORE.SAVE_USER', User>
export type RestoreUserAction = Action<'CORE.RESTORE_USER', void>
export type UserReceivedAction = Action<'CORE.USER_RECEIVED', UserResponse>
export type ResetAction = Action<'CORE.RESET', void>

export type CoreAction =
  | InitAction
  | InitContinueAction
  | UpdateLocationAction
  | UpdateUnitAction
  | UpdateCurrencyAction
  | FatalErrorAction
  | UpdateShippingsAction
  | SaveUserAction
  | UserReceivedAction
  | ResetAction
  | RestoreUserAction

export const init = ({featureFlags, urlParams, restoreSessionEnabled}: InitPayload): InitAction => ({
  type: 'CORE.INIT',
  payload: {
    featureFlags,
    urlParams,
    restoreSessionEnabled
  }
})

export const initContinue = (
  materialGroups: MaterialGroup[]
): InitContinueAction => ({
  type: 'CORE.INIT_CONTINUE',
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

export const updateCurrency = (currency: string, force: boolean = false): UpdateCurrencyAction => ({
  type: 'CORE.UPDATE_CURRENCY',
  payload: {currency, force}
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})

export const updateShippings = (payload: Shipping[]): UpdateShippingsAction => ({
  type: 'CORE.UPDATE_SHIPPINGS',
  payload
})

export const saveUser = (user: User): SaveUserAction => ({
  type: 'CORE.SAVE_USER',
  payload: user
})

export const restoreUser = (): RestoreUserAction => ({
  type: 'CORE.RESTORE_USER',
  payload: undefined
})

export const userReceived = (payload: UserResponse): UserReceivedAction => ({
  type: 'CORE.USER_RECEIVED',
  payload
})

export const reset = (): ResetAction => ({
  type: 'CORE.RESET',
  payload: undefined
})
