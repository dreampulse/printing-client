import {routerActions} from 'react-router-redux'

import Store from '../../../../src/app/store'
import {goToVendor, goToCart} from '../../../../src/app/action/navigation'

describe('Navigation Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(routerActions, 'push').returns({type: 'foo'})
    store = Store({})
  })

  afterEach(() => {
    sinon.restore(routerActions.push)
  })

  describe('goToVendor()', () => {
    it('should got to vendor', () => {
      store.dispatch(goToVendor())
      expect(routerActions.push, 'was called with', '/vendor')
    })
  })

  describe('goToCart()', () => {
    it('should got to vendor', () => {
      store.dispatch(goToCart())
      expect(routerActions.push, 'was called with', '/cart')
    })
  })
})
