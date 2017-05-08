import {init} from 'Action/init'
import * as userActions from 'Action/user'
import * as materialActions from 'Action/material'
import * as modalActions from 'Action/modal'

import {resolveAsyncThunk, rejectAsyncThunk} from '../../../helper'

import AppError from '../../../../src/app/lib/error'
import {ERROR_TYPE} from '../../../../src/app/type'

describe('Model actions', () => {
  let initialStoreData
  let store

  beforeEach(() => {
    initialStoreData = {}
    store = mockStore(initialStoreData)

    sinon.stub(userActions, 'detectAddress')
    sinon.stub(userActions, 'createUser')
    sinon.stub(materialActions, 'getMaterials')
    sinon.stub(modalActions, 'openAddressModal')
    sinon.stub(modalActions, 'openFatalErrorModal')
  })

  afterEach(() => {
    userActions.detectAddress.restore()
    userActions.createUser.restore()
    materialActions.getMaterials.restore()
    modalActions.openAddressModal.restore()
    modalActions.openFatalErrorModal.restore()
  })

  describe('init()', () => {
    it('dispatches expected actions, when everything succeeds', async () => {
      userActions.detectAddress
        .withArgs()
        .returns(resolveAsyncThunk('some-address-deteced'))

      materialActions.getMaterials
        .withArgs()
        .returns({type: 'got-some-materials'})

      userActions.createUser
        .withArgs()
        .returns({type: 'some-user-created'})

      await store.dispatch(init())
      expect(store.getActions(), 'to equal', [
        {type: 'got-some-materials'},
        {type: 'some-address-deteced'},
        {type: 'some-user-created'}
      ])
    })

    it('opens address modal, when address detection fails', async () => {
      userActions.detectAddress
        .withArgs()
        .returns(rejectAsyncThunk('some-address-deteced', new AppError(ERROR_TYPE.DETECT_ADDRESS_FAILED)))

      materialActions.getMaterials
        .withArgs()
        .returns({type: 'got-some-materials'})

      modalActions.openAddressModal
        .returns({type: 'some-address-modal-opened'})

      await store.dispatch(init())
      expect(store.getActions(), 'to equal', [
        {type: 'got-some-materials'},
        {type: 'some-address-deteced'},
        {type: 'some-address-modal-opened'}
      ])
    })

    it('does not create a user, when address detection fails', async () => {
      userActions.detectAddress
        .withArgs()
        .returns(rejectAsyncThunk('some-address-deteced', new AppError(ERROR_TYPE.DETECT_ADDRESS_FAILED)))

      materialActions.getMaterials
        .withArgs()
        .returns({type: 'got-some-materials'})

      modalActions.openAddressModal
        .returns({type: 'some-address-modal-opened'})

      await store.dispatch(init())
      expect(userActions.createUser, 'was not called')
    })

    it('opens fatal error modal, when an unknown error occures', async () => {
      userActions.detectAddress
        .withArgs()
        .returns(resolveAsyncThunk('some-address-deteced'))

      materialActions.getMaterials
        .returns(rejectAsyncThunk('got-some-materials', new Error('some-error')))

      modalActions.openFatalErrorModal
        .returns({type: 'some-fatal-error-modal-opened'})

      await store.dispatch(init())
      expect(store.getActions(), 'to equal', [
        {type: 'got-some-materials'},
        {type: 'some-address-deteced'},
        {type: 'some-fatal-error-modal-opened'}
      ])
    })
  })
})
