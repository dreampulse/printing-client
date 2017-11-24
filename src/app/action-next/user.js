// @flow
import {createAction} from 'redux-actions'
import type {Location} from '../type-next'

import {USER} from '../action-type-next'

export const changeLocation = createAction(USER.CHANGE_LOCATION, (location: Location) => location)
