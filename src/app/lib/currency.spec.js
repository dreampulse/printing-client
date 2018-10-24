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
    sandbox.stub(config, 'defaultCurrency').value('USD')
    sandbox.stub(currency, 'currencyByCountry').value({
      DE: 'EUR',
      AG: 'XCD' // Unsupported currency
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns EUR for DE', () => expect(getValidCurrency('DE'), 'to equal', 'EUR'))
  it('returns USD for unsupported currency', () =>
    expect(getValidCurrency('AG'), 'to equal', 'USD'))
  it('returns USD for invalid input', () => expect(getValidCurrency(null), 'to equal', 'USD'))
})
