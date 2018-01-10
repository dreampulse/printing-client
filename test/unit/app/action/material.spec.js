import {selectMaterial, selectMaterialGroup} from '../../../../src/app/action/material'
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

  describe('selectMaterialGroup()', () => {
    it('dispatches expected actions', () => {
      priceActions.createPriceRequest.returns(() => 'some-price-id')
      store.dispatch(selectMaterialGroup('group-id'))
      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.MATERIAL.GROUP_SELECTED,
          payload: 'group-id'
        }
      ])
    })

    it('creates a price request', () => {
      priceActions.createPriceRequest.returns(() => 'some-price-id')
      store.dispatch(selectMaterialGroup('some-material-id'))
      expect(priceActions.createPriceRequest, 'to have a call satisfying', [])
    })

    it('resolves with undefined', async () => {
      priceActions.createPriceRequest.returns(async () => 'some-price-id')
      expect(await store.dispatch(selectMaterialGroup('group-id')), 'to equal', undefined)
    })

    it('resolves after the price request has been resolved', async () => {
      let resolved = false

      priceActions.createPriceRequest.returns(async () => {
        resolved = true
      })
      await store.dispatch(selectMaterialGroup('group-id'))
      expect(resolved, 'to equal', true)
    })
  })
})
