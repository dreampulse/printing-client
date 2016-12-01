import * as api from '../lib/api'
import Modal from './modal'
import Model from './model'

import TYPE from '../type'

export {routerActions} from 'react-router-redux'
export const modal = Modal({})
export const model = Model({api})
export const foo = {
  bar: () => ({
    type: TYPE.APP.FOO_ACTION
  })
}
