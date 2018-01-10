import * as coreAction from '../../../../src/app/action-next/core'
import {selectMaterialGroups} from '../../../../src/app/selector'

import reducer from '../../../../src/app/reducer'
import materialResponse from '../../../../test-data/mock/material-response.json'

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
      materialGroups = materialResponse
      state = reducer(undefined, coreAction.updateMaterialGroups(materialGroups))
    })

    describe('using selectMaterialGroups() selector', () => {
      it('returns the updated material groups', () =>
        expect(selectMaterialGroups(getModel(state)), 'to satisfy', materialResponse))
    })
  })
})
