import {ariaButtonProps} from '../../../../src/app/lib/aria'

describe('ariaButtonProps()', () => {
  it('returns all the necessary props to mimic a button', () => {
    const ariaLabel = 'Some label'
    const onClick = () => {}
    const props = ariaButtonProps({ariaLabel, onClick})

    expect(props, 'to satisfy', {
      role: 'button',
      'aria-label': ariaLabel,
      tabIndex: 0,
      onClick
    })
  })

  it('returns a keypress handler', () => {
    const ariaLabel = 'Some label'
    const onClick = sinon.spy()
    const props = ariaButtonProps({ariaLabel, onClick})

    expect(props.onKeyPress, 'to be a', Function)
  })

  it('triggers the onClick handler when the space key is pressed', () => {
    const ariaLabel = 'Some label'
    const onClick = sinon.spy()
    const props = ariaButtonProps({ariaLabel, onClick})
    const keyboardEvent = {key: ' '}

    props.onKeyPress(keyboardEvent)
    expect(onClick, 'was called with', keyboardEvent)
  })

  it('triggers the onClick handler when the enter key is pressed', () => {
    const ariaLabel = 'Some label'
    const onClick = sinon.spy()
    const props = ariaButtonProps({ariaLabel, onClick})
    const keyboardEvent = {key: 'Enter'}

    props.onKeyPress(keyboardEvent)
    expect(onClick, 'was called with', keyboardEvent)
  })

  it('throws no error a non-enter key is pressed', () => {
    const ariaLabel = 'Some label'
    const onClick = sinon.spy()
    const props = ariaButtonProps({ariaLabel, onClick})
    const keyboardEvent = {key: 'a'}

    expect(() => props.onKeyPress(keyboardEvent), 'not to throw')
  })
})
