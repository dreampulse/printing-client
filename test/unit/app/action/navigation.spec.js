import {routerActions} from 'react-router-redux'

import {
  goToCart,
  goToSuccess,
  goToAddress,
  goToHome
} from 'Action/navigation'
import Store from '../../../../src/app/store'

describe('Navigation actions', () => {
  let store

  beforeEach(() => {
    sinon.stub(routerActions, 'push').returns({type: 'foo'})
    store = Store({})
  })

  afterEach(() => {
    sinon.restore(routerActions.push)
  })

  describe('goToCart()', () => {
    it('should got to vendor', () => {
      store.dispatch(goToCart())
      expect(routerActions.push, 'was called with', '/cart')
    })
  })

  describe('goToAddress()', () => {
    it('should got to vendor', () => {
      store.dispatch(goToAddress())
      expect(routerActions.push, 'was called with', '/address')
    })
  })

  describe('goToSuccess()', () => {
    it('should got to vendor', () => {
      store.dispatch(goToSuccess())
      expect(routerActions.push, 'was called with', '/success')
    })
  })

  describe('goToHome()', () => {
    it('should got to vendor', () => {
      store.dispatch(goToHome())
      expect(routerActions.push, 'was called with', '/')
    })
  })
})