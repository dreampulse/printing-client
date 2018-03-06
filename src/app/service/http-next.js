// @flow
/* global Headers, fetch */

// if fetch is called on a different object, an illegal invocation error is thrown
const boundFetch = fetch.bind(null)

export {Headers, boundFetch as fetch}
