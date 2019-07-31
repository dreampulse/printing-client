export const setItem = (key: string, item: any) => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(item))
    }
  } catch (error) {
    // Ignore errors
    // See https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
  }
}

export const getItem = <T>(key: string): T | null => {
  try {
    const result = window.localStorage.getItem(key)
    return result && JSON.parse(result)
  } catch (error) {
    // Ignore errors
    return null
  }
}

export const removeItem = (key: string) => {
  try {
    if (window.localStorage) {
      window.localStorage.removeItem(key)
    }
  } catch (error) {
    // Ignore errors
  }
}
