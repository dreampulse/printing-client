import * as init from 'App/action-next/init'
import * as core from 'App/action-next/core'
import * as modal from 'App/action-next/modal'
import * as user from 'App/action-next/user'
import {listMaterials} from 'App/lib/printing-engine'
import {getLocationByIp} from 'App/lib/geolocation'
import {
  selectModels,
  selectUploadingModels,
  selectMaterialGroups,
  selectUserId,
  selectShippingAddress,
  selectCurrency,
  isModalOpen,
  selectModalConfig
} from 'App/selector'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'
import geolocationSuccessResponse from '../../../../test-data/mock/geolocation-success-response.json'

describe('init actions', () => {
  describe(init.TYPE.INIT, () => {
    ;[
      [selectModels, []],
      [selectUploadingModels, []],
      [selectMaterialGroups, []],
      [selectUserId, null],
      [selectShippingAddress, null],
      [selectCurrency, 'USD'],
      [isModalOpen, false],
      [selectModalConfig, {isCloseable: true, content: null}]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(init.init())
        expect(selector(state), 'to equal', expected)
      })
    })

    it(`triggers action ${core.TYPE
      .UPDATE_MATERIAL_GROUPS} with the result from listMaterials`, () => {
      const {actions} = testDispatch(init.init()).simulate({
        func: listMaterials,
        args: [],
        result: materialListResponse
      })
      expect(actions, 'to contain', core.updateMaterialGroups(materialListResponse))
    })

    it(`triggers action ${modal.TYPE
      .OPEN_FATAL_ERROR} of type 'LOAD_MATERIAL_GROUPS_FAILED' when listMaterials failed`, () => {
      const {actions} = testDispatch(init.init()).simulate({
        func: listMaterials,
        args: [],
        result: new Error('Some error')
      })
      expect(actions, 'to contain', modal.openFatalError('LOAD_MATERIAL_GROUPS_FAILED'))
    })

    it(`triggers action ${user.TYPE.CHANGE_LOCATION} with the result from getLocationByIp`, () => {
      const {actions} = testDispatch(init.init()).simulate({
        func: getLocationByIp,
        args: [],
        result: geolocationSuccessResponse
      })
      expect(actions, 'to contain', user.changeLocation(geolocationSuccessResponse))
    })

    it(`triggers action ${modal.TYPE.OPEN_ADDRESS} when getLocationByIp failed`, () => {
      const {actions} = testDispatch(init.init()).simulate({
        func: getLocationByIp,
        args: [],
        result: new Error('Some error')
      })
      expect(actions, 'to contain', modal.openAddress())
    })
  })
})
