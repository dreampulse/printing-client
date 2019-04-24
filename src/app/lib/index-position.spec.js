import {getIndexPositionDiff} from './index-position'

describe('getIndexPositionDiff()', () => {
  it('returns the difference in position', () =>
    expect(
      getIndexPositionDiff([{key: 1}, {key: 2}, {key: 3}], [{key: 1}, {key: 3}], 3),
      'to equal',
      -1
    ))

  it('returns null if not found in prev elements', () =>
    expect(getIndexPositionDiff([{key: 1}, {key: 2}, {key: 3}], [{key: 5}], 5), 'to equal', null))

  it('returns null if not found in elements', () =>
    expect(getIndexPositionDiff([{key: 1}, {key: 2}, {key: 3}], [{key: 5}], 3), 'to equal', null))

  it('returns null prev elements is undefined', () =>
    expect(getIndexPositionDiff(undefined, [{key: 5}], 3), 'to equal', null))
})
