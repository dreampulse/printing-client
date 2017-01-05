import { routerActions } from 'react-router-redux'

import Store from '../../../../src/app/store'
import * as price from '../../../../src/app/action/price'
import { goToVendor } from '../../../../src/app/action/navigation'

describe('Navigation Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(price)
    sinon.stub(routerActions, 'push').returns({type: 'foo'})
    store = Store({})
  })

  afterEach(() => {
    sinon.restore(price)
    sinon.restore(routerActions.push)
  })

  describe('goToVendor()', () => {
    it('should got to vendor', () => {
      price.createPriceRequest.returns({type: 'bar'})
      store.dispatch(goToVendor())
      expect(routerActions.push, 'was called with', '/vendor')
    })
  })
})
