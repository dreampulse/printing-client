export const delay = time =>
  new Promise(resolve =>
    setTimeout(resolve, time)
  )

export default (promise, time) =>
  Promise.race([
    promise,
    delay(time).then(() => {
      throw new Error('Operation timed out')
    })
  ])
