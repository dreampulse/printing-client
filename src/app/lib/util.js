import curry from 'lodash/curry'

export const updateArrayItems = curry((array, test, changes) =>
  array.map(element => (test(element) ? {
    ...element,
    ...changes
  } : element))
)
