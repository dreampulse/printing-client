// @flow

export class PromiseCancelledError extends Error {
  constructor() {
    super('Promise cancelled.')
    this.name = 'PromiseCancelledError'
  }
}

export const cancelablePromise = (promise: Promise<any>) => {
  let hasCanceled = false

  const wrappedPromise: Promise<any> = new Promise((resolve, reject) => {
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

export const singletonPromise = () => {
  let storedPromise: {promise: Promise<any>, cancel: () => void}

  return (promise: Promise<any>): Promise<any> => {
    // Cancel old promise
    if (storedPromise) {
      storedPromise.cancel()
    }

    storedPromise = cancelablePromise(promise)

    return storedPromise.promise
  }
}
