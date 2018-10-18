import {getProviderName} from './provider-selector'

import config from '../../../config/index'

describe('getProviderName()', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox.stub(config, 'providerNames').value({
      providerSlug1: 'providerName1',
      providerSlug2: 'providerName2'
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns the provider name for a given provider slug', () => {
    expect(getProviderName('providerSlug1'), 'to equal', 'providerName1')
  })

  it('returns the provider slug as fallback', () => {
    expect(getProviderName('providerSlugX'), 'to equal', 'providerSlugX')
  })
})
