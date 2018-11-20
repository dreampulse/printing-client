const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export default <T>(promise: Promise<T>, time: number) =>
  Promise.race([
    promise,
    delay(time).then(() => {
      throw new Error('Operation timed out')
    })
  ])
