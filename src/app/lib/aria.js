// @flow

import invariant from 'invariant'

export const ariaButtonProps = ({ariaLabel, onClick}: {ariaLabel: string, onClick: Function}) => {
  invariant(ariaLabel, `Missing ariaLabel argument`)
  invariant(onClick, `Missing onClick handler`)

  return {
    role: 'button',
    'aria-label': ariaLabel,
    tabIndex: 0,
    onClick,
    onKeyPress(event: KeyboardEvent) {
      const isLikeOnClick = event.key === ' ' || event.key === 'Enter'

      if (isLikeOnClick) {
        onClick(event)
      }
    }
  }
}
