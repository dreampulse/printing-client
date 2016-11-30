import querystring from 'querystring'
import forOwn from 'lodash/forOwn'

export function buildUrl (baseUrl, path, data) {
  return baseUrl + path +
    (data ? '?' + querystring.stringify(data) : '')
}

export function buildPath (pattern, vars) {
  let path = pattern
  forOwn(vars, (value, wildcard) => {
    const regex = new RegExp(`:${wildcard}`, 'g')
    path = path.replace(regex, encodeURIComponent(value))
  })
  return path
}
