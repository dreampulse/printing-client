const storage = global.localStorage

export default {
  getItem: (key) => JSON.parse(storage.getItem(key)),
  setItem: (key, data) => storage.setItem(key, JSON.stringify(data)),
  removeItem: (key) => storage.removeItem(key),
  clear: () => storage.clear()
}
