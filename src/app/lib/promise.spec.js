import {PromiseCancelledError, cancelablePromise, singletonPromise} from './promise'

describe('Promise lib', () => {
  describe('PromiseCancelledError', () => {
    it('sets error message', () => {
      const error = new PromiseCancelledError()
      expect(error.message, 'to equal', 'Promise cancelled.')
    })

    it('sets error name', () => {
      const error = new PromiseCancelledError()
      expect(error.name, 'to equal', 'PromiseCancelledError')
    })
  })

  describe('cancelablePromise()', () => {
    it('resolves promise if not cancelled', () => {
      const payload = 'some-payload'

      return expect(
        cancelablePromise(
          new Promise(resolve => {
            resolve(payload)
          })
        ).promise,
        'to be fulfilled with',
        payload
      )
    })

    it('rejects promise if not cancelled', () => {
      const error = new Error('some-error')

      return expect(
        cancelablePromise(
          new Promise((resolve, reject) => {
            reject(error)
          })
        ).promise,
        'to be rejected with',
        error
      )
    })

    it('rejects promise with PromiseCancelledError if cancelled and promise would resolve', () => {
      let resolve
      const cancelable = cancelablePromise(
        new Promise(res => {
          resolve = res
        }),
        false
      )

      cancelable.cancel()
      setTimeout(resolve, 1)

      return expect(
        cancelable.promise,
        'to be rejected with error satisfying',
        new PromiseCancelledError()
      )
    })

    it('rejects promise with PromiseCancelledError if cancelled and promise would reject', () => {
      let reject
      const cancelable = cancelablePromise(
        new Promise((res, rej) => {
          reject = rej
        }),
        false
      )

      cancelable.cancel()
      setTimeout(reject, 1)

      return expect(
        cancelable.promise,
        'to be rejected with error satisfying',
        new PromiseCancelledError()
      )
    })
  })

  describe('singletonPromise()', () => {
    it('resolves promise', () => {
      const singleton = singletonPromise()
      const payload = 'some-payload'

      return expect(
        singleton(
          new Promise(resolve => {
            resolve(payload)
          })
        ),
        'to be fulfilled with',
        payload
      )
    })

    it('rejects promise', () => {
      const singleton = singletonPromise()
      const error = new Error('some-error')

      return expect(
        singleton(
          new Promise((resolve, reject) => {
            reject(error)
          })
        ),
        'to be rejected with',
        error
      )
    })

    it('rejects old promise when new promise is created', () => {
      let resolve1
      const singleton = singletonPromise()
      const promise1 = singleton(
        new Promise(resolve => {
          resolve1 = resolve
        })
      )

      singleton(
        new Promise(() => {
          resolve1()
        })
      )

      return expect(promise1, 'to be rejected with error satisfying', new PromiseCancelledError())
    })
  })
})
