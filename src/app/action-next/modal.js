// @flow
import {createAction} from 'redux-actions'

import {MODAL} from '../action-type-next'

export const openAddress = createAction(MODAL.OPEN_ADDRESS)
export const openFatalError = createAction(MODAL.OPEN_FATAL_ERROR, (message: string) => message)
