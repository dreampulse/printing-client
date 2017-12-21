import * as coreAction from '../../../../src/app/action-next/core'
import {selectMaterialGroups} from '../../../../src/app/selector'

import reducer from '../../../../src/app/reducer'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'

describe('core action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('updateMaterialGroups()', () => {
    let materialGroups
    let state

    beforeEach(() => {
      materialGroups = materialListResponse.materialStructure
      state = reducer(undefined, coreAction.updateMaterialGroups(materialGroups))
    })

    it('assigns material ids to all material groups', () => {
      const action = coreAction.updateMaterialGroups(materialListResponse.materialStructure)

      expect(action.payload.every(material => 'id' in material), 'to be', true)
    })

    describe('using selectMaterialGroups() selector', () => {
      it('returns the updated material group', () =>
        expect(
          selectMaterialGroups(getModel(state)),
          'to satisfy',
          materialListResponse.materialStructure
        ))
    })
  })
})
