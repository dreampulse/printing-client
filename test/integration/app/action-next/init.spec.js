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
    let selectorsToTest
    let state

    before(() => {
      selectorsToTest = Object.values(selector)
    })

    beforeEach(() => {
      state = reducer(undefined, initAction.init())
    })

    after(() => {
      if (selectorsToTest.length > 0) {
        throw new Error(`Missing init test for selector ${selectorsToTest[0].name}()`)
      }
    })
    ;[
      [selector.selectModelsOfModelConfigs, []],
      [selector.selectModelConfigs, []],
      [selector.selectMaterialGroups, []],
      [selector.selectUserId, null],
      [selector.selectCurrency, 'USD'],
      [selector.selectLocation, null],
      [selector.isModalOpen, false],
      [selector.selectModalConfig, {isCloseable: true, content: null, contentProps: null}],
      [selector.selectSelectedModelConfigIds, []],
      [selector.selectSelectedModelConfigs, []],
      [selector.selectChosenMaterialConfigIds, []]
    ].forEach(([testSelector, expected]) => {
      it(`${testSelector.name}() returns the expected result after execution`, () => {
        expect(testSelector(getModel(state)), 'to equal', expected)
        selectorsToTest = selectorsToTest.filter(s => s !== testSelector)
      })
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

    it(`triggers the modalAction.openPickLocationModal() action when getLocationByIp failed`, () => {
      const err = new Error('Some error')
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', modalAction.openPickLocationModal())
    })
  })
})
