import printingEngine from '../../../../../src/app/lib/printing-engine'

describe('Printing Engine REST Api Integration Test', () => {
  let price, store

  beforeEach(() => {
  })

  describe('listMaterials()', () => {
    it('should work', async () => {
      const materials = await printingEngine.listMaterials()
      expect(materials['0'].name, 'to be ok')
    })
  })
})
