import {ReactElement} from 'react'
import findIndex from 'lodash/findIndex'
import difference from 'lodash/difference'

export const getIndexPositionDiff = <P>(
  prevElements: ReactElement<P>[],
  elements: ReactElement<P>[],
  key: number
): number | null => {
  const positionInElements = findIndex(elements, element => element.key === key)
  const positionInPrevElements = findIndex(prevElements, element => element.key === key)

  if (positionInElements === -1 || positionInPrevElements === -1) return null

  return positionInElements - positionInPrevElements
}

export const getIndexOfElement = <P>(elements: ReactElement<P>[], key: number): number | null => {
  const positionInElements = findIndex(elements, element => element.key === key)

  if (positionInElements === -1) return null

  return positionInElements
}

export const getIndexOfRemovedElement = <P>(
  prevElements: ReactElement<P>[],
  elements: ReactElement<P>[],
  key: number
): number | null => {
  const prevElementKeys = prevElements.map(element => element.key)
  const elementKeys = elements.map(element => element.key)

  const elementsDiff = difference(prevElementKeys, elementKeys)
  console.log('-- elementsDiff', elementsDiff)

  const diffPosition = findIndex(elementsDiff, k => k === key)
console.log('-- diffPosition', diffPosition)
  if (diffPosition === -1) return null

  return diffPosition
}
