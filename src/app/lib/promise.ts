export class PromiseCancelledError extends Error {
  constructor() {
    super('Promise cancelled.')
    this.name = 'PromiseCancelledError'
  }
}

export const cancelablePromise = <T>(promise: Promise<T>) => {
  let hasCanceled = false

  const wrappedPromise: Promise<T> = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject(new PromiseCancelledError()) : resolve(val)),
      error => (hasCanceled ? reject(new PromiseCancelledError()) : reject(error))
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true
    }
  }
}

export const singletonPromise = <T>() => {
  let storedPromise: {promise: Promise<T>, cancel: () => void}

  return (promise: Promise<T>): Promise<T> => {
    // Cancel old promise
    if (storedPromise) {
      storedPromise.cancel()
    }

    storedPromise = cancelablePromise(promise)

    return storedPromise.promise
  }
}
