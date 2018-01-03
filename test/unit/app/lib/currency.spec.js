import * as currency from '../../../../src/app/lib/currency'

describe('Currency lib', () => {
  describe('getCurrencies()', () => {
    let currencies
    beforeEach(() => {
      currencies = currency.getCurrencies()
    })
    it('returns all currencies supported', () => {
      expect(currencies.length, 'to equal', 3)
    })
    it('returns currencies prepared for select menu', () => {
      expect(currencies, 'to have items satisfying', 'to have own properties', ['value', 'label'])
    })
  })

  describe('formatCurrency()', () => {
    const value = '10.00'
    it('returns formatted price for USD', () => {
      const priceUsd = currency.formatCurrency(value, 'USD')
      expect(priceUsd, 'to equal', '$10.00')
    })
    it('returns formatted price for EUR', () => {
      const priceEur = currency.formatCurrency(value, 'EUR')
      expect(priceEur, 'to equal', '€10.00')
    })
    it('returns formatted price for GBP', () => {
      const priceGbp = currency.formatCurrency(value, 'GBP')
      expect(priceGbp, 'to equal', '£10.00')
    })
    it('returns formatted price for unknown currency', () => {
      const price = currency.formatCurrency('10.00', 'AUD')
      expect(price, 'to equal', 'AUD10.00')
    })
  })
})
