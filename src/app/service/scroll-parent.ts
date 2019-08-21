const DEFAULT_SCROLL_PARENT = 'BODY'

function isScrollParent(element: HTMLElement | null): boolean {
  if (!element) {
    return false
  }

  try {
    const {overflow, overflowY, overflowX} = window.getComputedStyle(element)
    return /(auto|scroll)/.test((overflow || '') + (overflowX || '') + (overflowY || ''))
  } catch (e) {
    return false
  }
}

export function getScrollParent(element: HTMLElement | null): HTMLElement {
  if (!element || element.tagName === DEFAULT_SCROLL_PARENT) {
    return window.document.body
  }
  if (isScrollParent(element)) {
    return element
  }
  return getScrollParent(element.parentElement)
}

export function getScrollParents(element: HTMLElement | null, scrollParents: HTMLElement[] = []): HTMLElement[] {
  if (!element || element.tagName === DEFAULT_SCROLL_PARENT) {
    return [...scrollParents, window.document.body]
  }

  return getScrollParents(
    element.parentElement,
    isScrollParent(element) ? [...scrollParents, element] : scrollParents
  )
}
