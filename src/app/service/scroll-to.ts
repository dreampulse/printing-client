import velocity from 'velocity-animate'

export default function scrollTo(selector: string, container?: string) {
  let el: HTMLElement | null = window.document.querySelector(selector) as HTMLElement
  // As any because types of velocity.animate are broken (it awaits jQuery<HTMLElement>)
  const containerEl = container ? (window.document.querySelector(container) as any) : window

  if (!el) {
    return
  }

  let offset = 0
  while (el !== containerEl && el !== null) {
    offset += el.offsetTop
    el = el.parentElement
  }

  containerEl.scrollTop = offset
}
