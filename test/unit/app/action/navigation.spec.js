import {routerActions} from 'react-router-redux'

import {goToCart, goToSuccess, goToAddress, goToHome} from '../../../../src/app/action/navigation'
import * as userActions from '../../../../src/app/action/user'
import {resolveAsyncThunk} from '../../../helper'

describe('Navigation actions', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(routerActions, 'push')
    sandbox.stub(userActions)
    store = mockStore({
      configuration: {},
      routing: {
        location: {
          search: 'some-search'
        }
      }
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('goToCart()', () => {
    it('calls router push with expected route', () => {
      const location = {
        pathname: '/cart',
        search: 'some-search'
      }
      routerActions.push.withArgs(location).returns({type: 'push'})

      store.dispatch(goToCart())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })
  })

  describe('goToAddress()', () => {
    it('calls router push with expected route', () => {
      const location = {
        pathname: '/address',
        search: 'some-search'
      }
      routerActions.push.withArgs(location).returns({type: 'push'})

      store.dispatch(goToAddress())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })
  })

  describe('goToSuccess()', () => {
    it('calls router push with expected route', async () => {
      const location = {
        pathname: '/success',
        search: 'some-search'
      }

      routerActions.push.withArgs(location).returns({type: 'push'})
      userActions.createUser.withArgs().returns(resolveAsyncThunk('some-user-created'))

      await store.dispatch(goToSuccess())
      expect(store.getActions(), 'to equal', [{type: 'push'}, {type: 'some-user-created'}])
    })
  })

  describe('goToHome()', () => {
    it('calls router push with expected route', () => {
      const location = {
        pathname: '/',
        search: 'some-search'
      }

      routerActions.push.withArgs(location).returns({type: 'push'})

      store.dispatch(goToHome())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })

    it('calls router push with expected route when in configuration mode', () => {
      store = mockStore({
        configuration: {
          configurationId: 'some-config-id'
        },
        routing: {
          location: {
            search: 'some-search'
          }
        }
      })

      const location = {
        pathname: '/configuration/some-config-id',
        search: 'some-search'
      }

      routerActions.push.withArgs(location).returns({type: 'push'})

      store.dispatch(goToHome())
      expect(store.getActions(), 'to equal', [{type: 'push'}])
    })
  })
})
