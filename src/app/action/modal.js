import {createAction} from 'redux-actions'

import TYPE from '../type'

export const open = ({contentFactory, contentProps}) =>
    createAction(TYPE.MODAL.OPEN)({contentFactory, contentProps})

export const close = createAction(TYPE.MODAL.CLOSE)
