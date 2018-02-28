import * as materialAction from '../../../../src/app/action-next/material'
import {selectChosenMaterialConfigIds} from '../../../../src/app/selector'
import {goToMaterial} from '../../../../src/app/action-next/navigation'
import reducer from '../../../../src/app/reducer'

describe('material action', () => {
  describe('chooseMaterial()', () => {
    let state

    beforeEach(() => {
      state = reducer(
        undefined,
        materialAction.chooseMaterial(['some-config-id-1', 'some-config-id-2'])
      )
    })

    it('dispatches gotToMaterial() action', () => {
      const cmd = getCmd(state).cmds[0]
      const simulatedAction = cmd.simulate()
      expect(simulatedAction, 'to equal', goToMaterial())
    })

    describe('using selectChosenMaterialConfigIds() selector', () => {
      it('returns the chosen material config ids', () =>
        expect(selectChosenMaterialConfigIds(getModel(state)), 'to equal', [
          'some-config-id-1',
          'some-config-id-2'
        ]))
    })
  })
})
