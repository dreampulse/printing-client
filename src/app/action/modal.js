import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'

export default function create () {
  const open = (title, contentFactory, contentProps, contentModifiers) =>
    createAction(TYPE.MODAL.OPEN)({contentFactory, title, contentProps, contentModifiers})
  const close = createAction(TYPE.MODAL.CLOSE)

  return {
    open,
    close
  }
}
