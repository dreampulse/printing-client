import {createAction} from 'redux-actions'

import TYPE from '../type'

export const open = ({title, contentFactory, contentProps, contentModifiers}) =>
    createAction(TYPE.MODAL.OPEN)({contentFactory, title, contentProps, contentModifiers})

export const close = createAction(TYPE.MODAL.CLOSE)

