// @flow
import * as cookie from 'js-cookie'

export const getCookie = (name: string) => cookie.get(name)
