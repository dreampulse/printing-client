import velocity from 'velocity-animate'

import config from '../../../config'

export default function scrollTo (selector) {
  const el = global.document.querySelector(selector)
  velocity(el, 'scroll', {
    duration: 300,
    easing: 'ease-in-out',
    offset: -1 * config.scrollToOffset
  })
}
