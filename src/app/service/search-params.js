// @flow

import URLSearchParams from 'url-search-params'

export const fromLocationSearch = (): URLSearchParams => new URLSearchParams(global.location.search)
