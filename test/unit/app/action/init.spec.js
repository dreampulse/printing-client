import {init} from 'Action/init'
import * as userActions from 'Action/user'
import * as materialActions from 'Action/material'
import * as modalActions from 'Action/modal'
import {AppError} from 'Lib/error'

import {resolveAsyncThunk, rejectAsyncThunk} from '../../../helper'

import {ERROR_TYPE} from '../../../../src/app/action-type'

describe('Init actions', () => {
  let initialStoreData
  let store
  let sandbox

  beforeEach(() => {
    initialStoreData = {}
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
    sandbox.stub(userActions, 'detectAddress')
    sandbox.stub(userActions, 'createUser')
    sandbox.stub(materialActions, 'getMaterials')
    sandbox.stub(modalActions, 'openAddressModal')
    sandbox.stub(modalActions, 'openFatalErrorModal')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('init()', () => {
    it('dispatches expected actions, when everything succeeds', async () => {
      userActions.detectAddress.withArgs().returns(resolveAsyncThunk('some-address-deteced'))

      materialActions.getMaterials.withArgs().returns({type: 'got-some-materials'})

      userActions.createUser.withArgs().returns({type: 'some-user-created'})

      await store.dispatch(init())
      expect(store.getActions(), 'to equal', [
        {type: 'got-some-materials'},
        {type: 'some-address-deteced'},
        {type: 'some-user-created'}
      ])
    })

    it('does not create a user, when address detection fails', () => {
      userActions.detectAddress
        .withArgs()
        .returns(
          rejectAsyncThunk('some-address-deteced', new AppError(ERROR_TYPE.DETECT_ADDRESS_FAILED))
        )

      materialActions.getMaterials.withArgs().returns({type: 'got-some-materials'})

      modalActions.openAddressModal.returns({type: 'some-address-modal-opened'})

      return store.dispatch(init()).catch(() => {
        expect(userActions.createUser, 'was not called')
      })
    })

    it('rejects promise when error occurs', () => {
      const error = new Error('some-error')
      userActions.detectAddress.withArgs().returns(resolveAsyncThunk('some-address-deteced'))

      materialActions.getMaterials.returns(rejectAsyncThunk('got-some-materials', error))

      modalActions.openFatalErrorModal.returns({type: 'some-fatal-error-modal-opened'})

      const promise = store.dispatch(init())
      return expect(promise, 'to be rejected with', error)
    })
  })
})
