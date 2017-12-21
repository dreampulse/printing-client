import {updateArrayItems} from '../../../../src/app/lib/util'

describe('Util lib', () => {
  describe('updateArrayItems()', () => {
    it('updates the item in the array which matches', async () => {
      const array = [{id: 1}, {id: 2}, {id: 3}]

      // Call individually to test currying
      const updatedArray = updateArrayItems(array)(item => item.id === 2)({
        updated: true
      })

      expect(updatedArray, 'to equal', [{id: 1}, {id: 2, updated: true}, {id: 3}])
    })
  })
})
