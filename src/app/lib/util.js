import {curry} from 'ramda'

// Update Field
export const update = curry((field, quantor, changes) =>
  field.map(element => (quantor(element) ? {
    ...element,
    ...changes
  } : element))
)
