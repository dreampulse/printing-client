import {getCommonQuantity} from '../../../../src/app/lib/quantity'

describe('Quantity lib', () => {
  describe('getCommonQuantity()', () => {
    it('returns common quantity when all given models have same quantity', async () => {
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

    it('filters uploading model configs', async () => {
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

    it('returns null when models do not have a common quantity', async () => {
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

    it('returns null when there are no models', async () => {
      expect(getCommonQuantity([]), 'to be', null)
    })

    it('returns null when there are only uploading models', async () => {
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
