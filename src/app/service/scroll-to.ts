import {tweenFromTo, easeInOut} from './animate'

export default function scrollTo(selector: string, container?: string) {
  let el: HTMLElement | null = window.document.querySelector(selector) as HTMLElement
  const containerEl = container
    ? (window.document.querySelector(container) as HTMLElement)
    : window.document.documentElement

  if (!el || !containerEl) {
    return Promise.reject(new Error('Element not found.'))
  }

  let scrollTop = 0
  while (el !== containerEl && el !== null) {
    scrollTop += el.offsetTop
    el = el.parentElement
  }

  return tweenFromTo(
    containerEl.scrollTop,
    scrollTop,
    600,
    (value: number) => {
      containerEl.scrollTop = value
    },
    easeInOut
  )
}
