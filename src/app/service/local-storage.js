// @flow

export const setItem = (key: string, item: any) =>
  global.localStorage.setItem(key, JSON.stringify(item))

export const getItem = (key: string) => {
  const result = global.localStorage.getItem(key)
  return result && JSON.parse(result)
}

export const removeItem = (key: string) => global.localStorage.removeItem(key)
