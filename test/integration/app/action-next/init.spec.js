import * as init from 'App/action-next/init'
import * as core from 'App/action-next/core'
import * as modal from 'App/action-next/modal'
import * as user from 'App/action-next/user'
import {listMaterials} from 'App/lib/printing-engine'
import {getLocationByIp} from 'App/lib/geolocation'
import * as selector from 'App/selector'
import reducer from 'App/reducer-next'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'
import geolocationSuccessResponse from '../../../../test-data/mock/geolocation-success-response.json'

describe('init action', () => {
  describe('init()', () => {
    let selectorsToTest
    let state

    before(() => {
      selectorsToTest = Object.values(selector)
    })

    beforeEach(() => {
      state = reducer(undefined, init.init())
    })

    after(() => {
      if (selectorsToTest.length > 0) {
        throw new Error(`Missing init test for selector ${selectorsToTest[0].name}()`)
      }
    })
    ;[
      [selector.selectModels, []],
      [selector.selectUploadingFiles, []],
      [selector.selectMaterialGroups, []],
      [selector.selectBasketItems, []],
      [selector.selectUserId, null],
      [selector.selectCurrency, 'USD'],
      [selector.isModalOpen, false],
      [selector.selectModalConfig, {isCloseable: true, content: null, contentProps: null}]
    ].forEach(([testSelector, expected]) => {
      it(`${testSelector.name}() returns the expected result after execution`, () => {
        expect(testSelector(getModel(state)), 'to equal', expected)
        selectorsToTest = selectorsToTest.filter(s => s !== testSelector)
      })
    })

    it(`triggers the core.updateMaterialGroups() action with the result from listMaterials`, () => {
      const cmd = findCmd(state, listMaterials, [])
      const action = cmd.simulate({
        success: true,
        result: materialListResponse
      })
      expect(action, 'to equal', core.updateMaterialGroups(materialListResponse.materialStructure))
    })

    it(`triggers the modal.openFatalErrorModal() action with the given error when listMaterials failed`, () => {
      const err = new Error('Some error')
      const cmd = findCmd(state, listMaterials, [])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', modal.openFatalErrorModal(err))
    })

    it(`triggers the user.updateLocation() action with the result from getLocationByIp`, () => {
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: true,
        result: geolocationSuccessResponse
      })
      expect(action, 'to equal', user.updateLocation(geolocationSuccessResponse))
    })

    it(`triggers the modal.openPickLocationModal() action when getLocationByIp failed`, () => {
      const err = new Error('Some error')
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', modal.openPickLocationModal())
    })
  })
})
