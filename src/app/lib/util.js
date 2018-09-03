// @flow

import partition from 'lodash/partition'

export function partitionBy<T>(array: Array<T>, predicate: T => boolean): Array<T> {
  const [partitionA, partitionB] = partition(array, predicate)
  return [...partitionA, ...partitionB]
}
