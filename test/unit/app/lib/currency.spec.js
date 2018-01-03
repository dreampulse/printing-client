import * as currency from '../../../../src/app/lib/currency'

describe('Currency lib', () => {
  describe('getCurrencies', () => {
    it('should return currencies', () => {
      const currencies = currency.getCurrencies()
      expect(currencies.length, 'to equal', 3)
      expect(currencies, 'to have items satisfying', 'to have own properties', ['value', 'label'])
    })
  })

  describe('formatCurrency', () => {
    it('should return formatted price for known currencies', () => {
      const value = '10.00'
      const priceUsd = currency.formatCurrency(value, 'USD')
      const priceEur = currency.formatCurrency(value, 'EUR')
      const priceGbp = currency.formatCurrency(value, 'GBP')
      expect(priceUsd, 'to equal', '$10.00')
      expect(priceEur, 'to equal', '€10.00')
      expect(priceGbp, 'to equal', '£10.00')
    })

    it('should return formatted price for unknown currency', () => {
      const price = currency.formatCurrency('10.00', 'AUD')
      expect(price, 'to equal', 'AUD10.00')
    })
  })
})
