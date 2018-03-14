import * as initAction from '../../../../src/app/action-next/init'
import * as coreAction from '../../../../src/app/action-next/core'
import * as modalAction from '../../../../src/app/action-next/modal'
import * as userAction from '../../../../src/app/action-next/user'
import {listMaterials} from '../../../../src/app/service/printing-engine'
import {getLocationByIp} from '../../../../src/app/lib/geolocation'
import * as selector from '../../../../src/app/selector'
import reducer from '../../../../src/app/reducer'
import materialResponse from '../../../../test-data/mock/material-response.json'
import geolocationSuccessResponse from '../../../../test-data/mock/geolocation-success-response.json'

describe('init action', () => {
  describe('init()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, initAction.init())
    })

    it(`triggers the coreAction.updateMaterialGroups() action with the result from listMaterials`, () => {
      const cmd = findCmd(state, listMaterials, [])
      const action = cmd.simulate({
        success: true,
        result: materialResponse
      })
      expect(
        action,
        'to equal',
        coreAction.updateMaterialGroups(materialResponse.materialStructure)
      )
    })

    it(`triggers the coreAction.fatalError() action with the given error when listMaterials failed`, () => {
      const err = new Error('Some error')
      const cmd = findCmd(state, listMaterials, [])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', coreAction.fatalError(err))
    })

    it(`triggers the userAction.locationDetected() action with the result from getLocationByIp`, () => {
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: true,
        result: geolocationSuccessResponse
      })
      expect(action, 'to equal', userAction.locationDetected(geolocationSuccessResponse))
    })

    it(`triggers the modalAction.openPickLocation() action when getLocationByIp failed`, () => {
      const err = new Error('Some error')
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', modalAction.openPickLocation())
    })

    describe('selector.selectModels()', () => {
      it('returns an empty array', () => {
        expect(selector.selectModels(getModel(state)), 'to equal', [])
      })
    })

    describe('selector.selectUploadingFiles()', () => {
      it('returns an empty array', () => {
        expect(selector.selectUploadingFiles(getModel(state)), 'to equal', [])
      })
    })

    describe('selector.selectMaterialGroups()', () => {
      it('returns an empty array', () => {
        expect(selector.selectMaterialGroups(getModel(state)), 'to equal', [])
      })
    })

    describe('selector.selectBasketItems()', () => {
      it('returns an empty array', () => {
        expect(selector.selectBasketItems(getModel(state)), 'to equal', [])
      })
    })

    describe('selector.selectUserId()', () => {
      it('returns null', () => {
        expect(selector.selectUserId(getModel(state)), 'to equal', null)
      })
    })

    describe('selector.selectCurrency()', () => {
      it('returns "USD"', () => {
        expect(selector.selectCurrency(getModel(state)), 'to equal', 'USD')
      })
    })

    describe('selector.selectLocation()', () => {
      it('returns null', () => {
        expect(selector.selectLocation(getModel(state)), 'to equal', null)
      })
    })

    describe('selector.isModalOpen()', () => {
      it('returns false', () => {
        expect(selector.isModalOpen(getModel(state)), 'to equal', false)
      })
    })

    describe('selector.selectMaterialGroups()', () => {
      it('returns null', () => {
        expect(selector.selectModalConfig(getModel(state)), 'to equal', null)
      })
    })
  })
})
