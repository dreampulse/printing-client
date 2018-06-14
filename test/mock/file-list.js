// Provides a subset of the browsers native FileList object
// See: https://developer.mozilla.org/en-US/docs/Web/API/FileList
export default files => ({
  length: files.length,
  [Symbol.iterator]: () => {
    let i = 0

    return {
      next: () => (i === files.length ? {done: true} : {value: files[i++], done: false})
    }
  }
})
