import reducer from '../../../../src/app/reducer-next'
import * as selector from '../../../../src/app/selector'

describe('reducer', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('initial state', () => {
    let state

    beforeEach(() => {
      state = reducer(undefined)
    })

    // This test should contain all available selectors and test their initial state!

    describe('selector.selectModelsOfModelConfigs()', () => {
      it('returns an empty array', () => {
        expect(selector.selectModelsOfModelConfigs(state), 'to equal', [])
      })
    })

    describe('selector.selectModelConfigs()', () => {
      it('returns an empty array', () => {
        expect(selector.selectModelConfigs(state), 'to equal', [])
      })
    })

    describe('selector.selectMaterialGroups()', () => {
      it('returns an empty array', () => {
        expect(selector.selectMaterialGroups(state), 'to equal', [])
      })
    })

    describe('selector.selectUserId()', () => {
      it('returns null', () => {
        expect(selector.selectUserId(state), 'to equal', null)
      })
    })

    describe('selector.selectCurrency()', () => {
      it('returns "USD"', () => {
        expect(selector.selectCurrency(state), 'to equal', 'USD')
      })
    })

    describe('selector.selectLocation()', () => {
      it('returns null', () => {
        expect(selector.selectLocation(state), 'to equal', null)
      })
    })

    describe('selector.isModalOpen()', () => {
      it('returns false', () => {
        expect(selector.selectUserId(state), 'to equal', null)
      })
    })

    describe('selector.selectModalConfig()', () => {
      it('returns the configuration for a closed modal', () => {
        expect(selector.selectModalConfig(state), 'to equal', null)
      })
    })

    describe('selector.selectSelectedModelConfigIds()', () => {
      it('returns an empty array', () => {
        expect(selector.selectSelectedModelConfigIds(state), 'to equal', [])
      })
    })

    describe('selector.selectSelectedModelConfigs()', () => {
      it('returns an empty array', () => {
        expect(selector.selectSelectedModelConfigs(state), 'to equal', [])
      })
    })

    describe('selector.isModelViewerOpen()', () => {
      it('returns false', () => {
        expect(selector.isModelViewerOpen(state), 'to equal', false)
      })
    })

    describe('selector.selectSceneId()', () => {
      it('returns null', () => {
        expect(selector.selectSceneId(state), 'to equal', null)
      })
    })
  })
})
