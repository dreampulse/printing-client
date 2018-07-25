import * as coreAction from '../../../../src/app/action-next/core'
import * as modalAction from '../../../../src/app/action-next/modal'
import reducer from '../../../../src/app/reducer-next'
import {getMaterialGroups} from '../../../../src/app/lib/printing-engine'
import {getLocationByIp} from '../../../../src/app/lib/geolocation'
import * as selector from '../../../../src/app/selector'
import materialResponse from '../../../../test-data/mock/material-response.json'
import geolocationSuccessResponse from '../../../../test-data/mock/geolocation-success-response.json'

describe('core action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('init()', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined, coreAction.init())
    })

    it.only('triggers coreAction.updateMaterialGroups() action with the result from getMaterialGroups', () => {
      const cmd = findCmd(state, Cmd.list([Cmd.run(getMaterialGroups), Cmd.run(getLocationByIp)]))
      const action = cmd.cmds[0].simulate({
        success: true,
        result: materialResponse
      })

      expect(
        action,
        'to equal',
        coreAction.updateMaterialGroups(materialResponse.materialStructure)
      )
    })

    it('triggers coreAction.fatalError() action with the given error when getMaterialGroups failed', () => {
      const error = new Error('Some error')
      const cmd = findCmd(state, Cmd.list([Cmd.run(getMaterialGroups), Cmd.run(getLocationByIp)]))
      const action = cmd.cmds[0].simulate({
        success: false,
        result: error
      })
      expect(action, 'to equal', coreAction.fatalError(error))
    })

    it('triggers coreAction.updateLocation() action with the result from getLocationByIp', () => {
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: true,
        result: geolocationSuccessResponse
      })
      expect(action, 'to equal', coreAction.updateLocation(geolocationSuccessResponse))
    })

    it('triggers modalAction.openPickLocation() action when getLocationByIp failed', () => {
      const err = new Error('Some error')
      const cmd = findCmd(state, getLocationByIp, [])
      const action = cmd.simulate({
        success: false,
        result: err
      })
      expect(action, 'to equal', modalAction.openPickLocation())
    })
  })

  describe('updateMaterialGroups()', () => {
    let materialGroups
    let state

    beforeEach(() => {
      materialGroups = materialResponse
      state = reducer(undefined, coreAction.updateMaterialGroups(materialGroups))
    })

    describe('using selectMaterialGroups() selector', () => {
      it('returns the updated material groups', () =>
        expect(selector.selectMaterialGroups(getModel(state)), 'to satisfy', materialResponse))
    })
  })

  describe('updateLocation()', () => {
    let location
    let state

    beforeEach(() => {
      location = {
        city: 'City',
        zipCode: 'ZipCode',
        stateCode: 'StateCode',
        countryCode: 'CountryCode'
      }
      state = reducer(undefined, coreAction.updateLocation(location))
    })

    describe('using selectLocation() selector', () => {
      it('returns the updated location', () =>
        expect(selector.selectLocation(getModel(state)), 'to satisfy', location))
    })
  })

  describe('updateCurrency()', () => {
    let currency
    let state

    beforeEach(() => {
      currency = 'some-currency'
      state = reducer(undefined, coreAction.updateCurrency(currency))
    })

    describe('using selectCurrency() selector', () => {
      it('returns the updated currency', () =>
        expect(selector.selectCurrency(getModel(state)), 'to satisfy', currency))
    })
  })
})
