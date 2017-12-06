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
  selectCurrency,
  isModalOpen,
  selectModalConfig
} from 'App/selector'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'
import geolocationSuccessResponse from '../../../../test-data/mock/geolocation-success-response.json'

describe.skip('init action', () => {
  describe(init.TYPE.INIT, () => {
    ;[
      [selectModels, []],
      [selectUploadingModels, []],
      [selectMaterialGroups, []],
      [selectUserId, null],
      [selectCurrency, 'USD'],
      [isModalOpen, false],
      [selectModalConfig, {isCloseable: true, content: null, contentArgs: null}]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const {state} = testDispatch(init.init())
        expect(selector(state), 'to equal', expected)
      })
    })

    it(`triggers the core.updateMaterialGroups() action with the result from listMaterials`, () => {
      const {actions} = testDispatch(init.init()).simulate({
        func: listMaterials,
        args: [],
        result: materialListResponse
      })
      expect(actions, 'to contain', core.updateMaterialGroups(materialListResponse))
    })

    it(`triggers the modal.openFatalErrorModal() action with the given error when listMaterials failed`, () => {
      const err = new Error('Some error')
      const {actions} = testDispatch(init.init()).simulate({
        func: listMaterials,
        args: [],
        result: err
      })
      expect(actions, 'to contain', modal.openFatalErrorModal(err))
    })

    it(`triggers the user.updateLocation() action with the result from getLocationByIp`, () => {
      const {actions} = testDispatch(init.init()).simulate({
        func: getLocationByIp,
        args: [],
        result: geolocationSuccessResponse
      })
      expect(actions, 'to contain', user.updateLocation(geolocationSuccessResponse))
    })

    it(`triggers the modal.openPickLocationModal() action when getLocationByIp failed`, () => {
      const err = new Error('Some error')
      const {actions} = testDispatch(init.init()).simulate({
        func: getLocationByIp,
        args: [],
        result: err
      })
      expect(actions, 'to contain', modal.openPickLocationModal())
    })
  })
})
