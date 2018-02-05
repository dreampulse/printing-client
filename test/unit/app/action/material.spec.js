import {selectMaterial} from '../../../../src/app/action/material'
import * as priceActions from '../../../../src/app/action/price'
import * as printingEngine from '../../../../src/app/service/printing-engine'
import * as materialLib from '../../../../src/app/lib/material'
import TYPE from '../../../../src/app/action-type'

describe('Material actions', () => {
  let initialStoreData
  let sandbox
  let store

  beforeEach(() => {
    initialStoreData = {}
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine)
    sandbox.stub(materialLib)
    sandbox.stub(priceActions)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('selectMaterial()', () => {
    it('dispatches expected actions', () => {
      store.dispatch(selectMaterial('some-material-id'))
      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.MATERIAL.SELECTED,
          payload: 'some-material-id'
        }
      ])
    })
  })
})
