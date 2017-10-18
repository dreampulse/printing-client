import timeout from 'Lib/timeout'

describe('timeout lib', () => {
  it('works for resolving promise', async () => {
    const result = await timeout(Promise.resolve('something'), 1)
    expect(result, 'to equal', 'something')
  })

  it('works for rejecting promise', () => {
    const err = new Error('something')

    return timeout(Promise.reject(err), 1)
      .catch((result) => {
        expect(result, 'to equal', err)
      })
  })

  it('fails after timeout', () => {
    const endlessPromise = new Promise(() => {})
    return timeout(endlessPromise, 1)
      .catch((result) => {
        expect(result, 'to equal', Error('Operation timed out'))
      })
  })
})
