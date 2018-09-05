import {getCommonQuantity} from './quantity'

describe('Quantity lib', () => {
  describe('getCommonQuantity()', () => {
    it('returns common quantity when all given models have same quantity', () => {
      const modelConfigs = [
        {
          type: 'UPLOADED',
          quantity: 2
        },
        {
          type: 'UPLOADED',
          quantity: 2
        }
      ]

      expect(getCommonQuantity(modelConfigs), 'to equal', 2)
    })

    it('filters uploading model configs', () => {
      const modelConfigs = [
        {
          type: 'UPLOADING'
        },
        {
          type: 'UPLOADED',
          quantity: 2
        }
      ]

      expect(getCommonQuantity(modelConfigs), 'to equal', 2)
    })

    it('returns null when models do not have a common quantity', () => {
      const modelConfigs = [
        {
          type: 'UPLOADED',
          quantity: 1
        },
        {
          type: 'UPLOADED',
          quantity: 2
        }
      ]

      expect(getCommonQuantity(modelConfigs), 'to be', null)
    })

    it('returns null when there are no models', () => {
      expect(getCommonQuantity([]), 'to be', null)
    })

    it('returns null when there are only uploading models', () => {
      const modelConfigs = [
        {
          type: 'UPLOADING'
        },
        {
          type: 'UPLOADING'
        }
      ]

      expect(getCommonQuantity(modelConfigs), 'to be', null)
    })
  })
})
