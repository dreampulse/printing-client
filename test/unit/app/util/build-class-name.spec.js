import buildClassName from '../../../../src/app/util/build-class-name'

describe('buildClassName()', () => {
  it('returns proper class name when modifier and className are set', () => {
    const className = buildClassName('some-class-name', ['some-modifier'], ['some-extra-class-name'])
    expect(className, 'to equal', 'some-class-name some-class-name--some-modifier some-extra-class-name')
  })

  it('returns proper class name when modifier and className are omitted', () => {
    const className = buildClassName('some-class-name')
    expect(className, 'to equal', 'some-class-name')
  })
})
