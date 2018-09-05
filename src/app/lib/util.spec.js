import {partitionBy} from './util'

describe('partitionBy()', () => {
  it('partitions elements by the predicate', () => {
    const array = ['LEFT', 'RIGHT', 'LEFT', 'RIGHT']
    const predicate = element => element === 'LEFT'

    expect(partitionBy(array, predicate), 'to equal', ['LEFT', 'LEFT', 'RIGHT', 'RIGHT'])
  })
})
