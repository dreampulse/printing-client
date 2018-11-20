import partition from 'lodash/partition'

export function partitionBy<T>(array: T[], predicate: (value: T) => boolean): T[] {
  const [partitionA, partitionB] = partition(array, predicate)
  return [...partitionA, ...partitionB]
}
