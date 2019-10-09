import {getValidCurrency} from './currency'
import config from '../../../config'
import * as currency from '../service/currency'

describe('getValidCurrency()', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox
      .stub(config, 'currencies')
      .value([{value: 'USD'}, {value: 'EUR'}, {value: 'GBP'}, {value: 'CAD'}, {value: 'AUD'}])
    sandbox.stub(config, 'defaultCurrencyPerCountry').value({FO: 'EUR'})
    sandbox.stub(config, 'defaultCurrency').value('USD')
    sandbox.stub(currency, 'currencyByCountry').value({
      DE: 'EUR',
      FO: 'FOO', // Unsupported currency
      AG: 'XCD' // Unsupported currency
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns EUR for DE', () => expect(getValidCurrency('DE'), 'to equal', 'EUR'))

  it('returns USD for unsupported currency', () =>
    expect(getValidCurrency('AG'), 'to equal', 'USD'))

  it('returns EUR for unsupported currency utilizing defaultCurrencyPerCountry', () =>
    expect(getValidCurrency('FO'), 'to equal', 'EUR'))

  it('returns USD for invalid input', () => expect(getValidCurrency(null), 'to equal', 'USD'))
})
