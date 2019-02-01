import velocity from 'velocity-animate'

import config from '../../../config'

export default function scrollTo(selector: any, container?: any) {
  const el = window.document.querySelector(selector)

  velocity.animate(el, 'scroll', {
    duration: 300,
    easing: 'ease-in-out',
    offset: -1 * config.scrollToOffset,
    container
  })
}
