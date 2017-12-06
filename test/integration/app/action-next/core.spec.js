import cloneDeep from 'lodash/cloneDeep'
import * as core from 'App/action-next/core'
import {generateMaterialIds} from 'App/lib/material'
import {selectMaterialGroups} from 'App/selector'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'

describe('core action', () => {
  describe('updateMaterialGroups()', () => {
    ;[
      [selectMaterialGroups, generateMaterialIds(cloneDeep(materialListResponse.materialStructure))]
    ].forEach(([selector, expected]) => {
      it(`${selector.name}(state) returns the expected result after execution`, () => {
        const materialGroups = materialListResponse.materialStructure
        const {state} = testDispatch(core.updateMaterialGroups(materialGroups))
        expect(selector(state), 'to equal', expected)
      })
    })

    it('selectMaterialGroups(state) returns a copy of the action payload', () => {
      const materialGroups = [materialListResponse.materialStructure[0]]
      const {state} = testDispatch(core.updateMaterialGroups(materialGroups))
      expect(selectMaterialGroups(state), 'not to be', materialGroups)
    })
  })
})
