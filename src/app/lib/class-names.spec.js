import cn from './class-names'

describe('classNames()', () => {
  it('returns single classname when single string is given', () => {
    const classNames = cn('some-component')
    expect(classNames, 'to equal', 'some-component')
  })

  it('returns proper class name when modifiers and className are given', () => {
    const className = cn(
      'some-component',
      {
        'some-modifier-1': true,
        'some-modifier-2': false
      },
      ['some-util']
    )
    expect(className, 'to equal', 'some-component some-component--some-modifier-1 some-util')
  })
})
