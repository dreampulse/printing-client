import buildClassName from '../../../../src/app/lib/build-class-name'

describe('buildClassName()', () => {
  it('returns proper class name when modifier and className are strings', () => {
    const className = buildClassName('some-class-name', 'some-modifier', 'some-extra-class-name')
    expect(className, 'to equal', 'some-class-name some-class-name--some-modifier some-extra-class-name')
  })

  it('returns proper class name when modifier and className are set', () => {
    const className = buildClassName('some-class-name', ['some-modifier'], ['some-extra-class-name'])
    expect(className, 'to equal', 'some-class-name some-class-name--some-modifier some-extra-class-name')
  })

  it('returns proper class name when modifier and className are omitted', () => {
    const className = buildClassName('some-class-name')
    expect(className, 'to equal', 'some-class-name')
  })

  it('returns proper class name for an object as modifier', () => {
    const className = buildClassName('some-class-name', {
      'some-modifier': true,
      'disabled-modifier': false
    })
    expect(className, 'to equal', 'some-class-name some-class-name--some-modifier')
  })

  it('returns proper class name for an object as extra class name', () => {
    const className = buildClassName('some-class-name', [], {
      'some-extra-class-name': true,
      'disabled-class-name': false
    })
    expect(className, 'to equal', 'some-class-name some-extra-class-name')
  })

  it('handles objects inside the array of the modifiers parameter', () => {
    const className = buildClassName('some-class-name', [
      'extra-modifier',
      {
        'some-extra-class-name': true,
        'disabled-class-name': false
      }
    ])
    expect(className, 'to equal',
      'some-class-name some-class-name--extra-modifier some-class-name--some-extra-class-name')
  })

  it('handles objects inside the array of the classNames parameter', () => {
    const className = buildClassName('some-class-name', [], [
      'extra-class-name',
      {
        'enabled-class-name': true,
        'disabled-class-name': false
      }
    ])
    expect(className, 'to equal',
      'some-class-name extra-class-name enabled-class-name')
  })

  it('ignores `undefined` in arrays', () => {
    const className = buildClassName('some-class-name', [undefined], [undefined, undefined])
    expect(className, 'to equal', 'some-class-name')
  })
})
