// @flow
import {createAction} from 'redux-actions'
import type {Location} from '../type-next'

import {USER} from '../action-type-next'

export const updateLocation = createAction(USER.UPDATE_LOCATION, (location: Location) => location)
