import {getValidCurrency} from './currency'
import config from '../../../config'

describe('getValidCurrency()', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox
      .stub(config, 'currencies')
      .value([{value: 'USD'}, {value: 'EUR'}, {value: 'GBP'}, {value: 'CAD'}, {value: 'AUD'}])
    sandbox.stub(config, 'defaultCurrencyPerCountry').value({DE: 'EUR'})
    sandbox.stub(config, 'defaultCurrency').value('USD')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns EUR for DE', () => expect(getValidCurrency('DE'), 'to equal', 'EUR'))

  it('returns USD for unsupported currency', () =>
    expect(getValidCurrency('AG'), 'to equal', 'USD'))

  it('returns USD for invalid input', () => expect(getValidCurrency(null), 'to equal', 'USD'))
})
