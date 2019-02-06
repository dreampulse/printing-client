import velocity from 'velocity-animate'

import config from '../../../config'

export default function scrollTo(selector: string, container?: string) {
  const el = window.document.querySelector(selector) as HTMLElement
  // As any because types of velocity.animate are broken (it awaits jQuery<HTMLElement>)
  const containerEl = container ? (window.document.querySelector(container) as any) : undefined

  if (el) {
    velocity.animate(el, 'scroll', {
      duration: 300,
      easing: 'ease-in-out',
      container: containerEl
    })
  }
}
