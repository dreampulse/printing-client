/* global URLSearchParams */

export const hasQueryParam = (props, queryString) => {
  return new URLSearchParams(props.location.search).has(queryString)
}
