export const setItem = (key: string, item: any) =>
  window.localStorage.setItem(key, JSON.stringify(item))

export const getItem = <T>(key: string): T => {
  const result = window.localStorage.getItem(key)
  return result && JSON.parse(result)
}

export const removeItem = (key: string) => window.localStorage.removeItem(key)
