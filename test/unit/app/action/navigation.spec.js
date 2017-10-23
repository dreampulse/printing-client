import {routerActions} from 'react-router-redux'

import {goToCart, goToSuccess, goToAddress, goToHome} from 'Action/navigation'
import * as userActions from 'Action/user'
import {resolveAsyncThunk} from '../../../helper'

describe('Navigation actions', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(routerActions, 'push')
    sandbox.stub(userActions)
    store = mockStore({
      configuration: {}
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('goToCart()', () => {
    it('calls router push with expected route', () => {
      routerActions.push.withArgs('/cart').returns({type: 'push'})

      store.dispatch(goToCart())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })
  })

  describe('goToAddress()', () => {
    it('calls router push with expected route', () => {
      routerActions.push.withArgs('/address').returns({type: 'push'})

      store.dispatch(goToAddress())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })
  })

  describe('goToSuccess()', () => {
    it('calls router push with expected route', async () => {
      routerActions.push.withArgs('/success').returns({type: 'push'})
      userActions.createUser.withArgs().returns(resolveAsyncThunk('some-user-created'))

      await store.dispatch(goToSuccess())
      expect(store.getActions(), 'to equal', [{type: 'push'}, {type: 'some-user-created'}])
    })
  })

  describe('goToHome()', () => {
    it('calls router push with expected route', () => {
      routerActions.push.withArgs('/').returns({type: 'push'})

      store.dispatch(goToHome())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })

    it('calls router push with expected route when in configuration mode', () => {
      store = mockStore({
        configuration: {
          configurationId: 'some-config-id'
        }
      })

      routerActions.push.withArgs('/configuration/some-config-id').returns({type: 'push'})

      store.dispatch(goToHome())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })
  })
})
