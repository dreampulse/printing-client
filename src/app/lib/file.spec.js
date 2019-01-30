import {parseFileName} from './file'

describe('File lib', () => {
  describe('parseFileName', () => {
    it('returns object with name and extension of given filename', () => {
      expect(parseFileName('foobar.js'), 'to equal', {
        name: 'foobar',
        extension: 'js'
      })
    })

    it('handles filenames with multiple "."', () => {
      expect(parseFileName('foobar.spec.js'), 'to equal', {
        name: 'foobar.spec',
        extension: 'js'
      })
    })

    it('handles filenames without name', () => {
      expect(parseFileName('.htaccess'), 'to equal', {
        name: '',
        extension: 'htaccess'
      })
    })
  })
})
