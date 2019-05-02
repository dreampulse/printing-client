const DEFAULT_SCROLL_PARENT = 'BODY'

function isScrollParent(element) {
  try {
    const {overflow, overflowY, overflowX} = global.tComputedStyle(element)
    return /(auto|scroll)/.test(overflow + overflowX + overflowY)
  } catch (e) {
    return false
  }
}

export function getScrollParent(element) {
  if (!element || element.tagName === DEFAULT_SCROLL_PARENT) {
    return global.document.body
  }
  if (isScrollParent(element)) {
    return element
  }
  return getScrollParent(element.parentElement)
}

export function getScrollParents(element, scrollParents = []) {
  if (!element || element.tagName === DEFAULT_SCROLL_PARENT) {
    return [...scrollParents, global.document.body]
  }

  return getScrollParents(
    element.parentElement,
    isScrollParent(element) ? [...scrollParents, element] : scrollParents
  )
}
