// Easing functions (source: https://gist.github.com/gre/1650294)

// No easing, no acceleration
export const easeLinear = (t: number) => t
// Acceleration until halfway, then deceleration
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export type AnimatePromise = Promise<void> & {
  cancel: () => AnimatePromise
  finally: (cb: () => void) => AnimatePromise
}

export const tween = (fn: (t: number) => void, duration: number, easingFn = easeLinear) => {
  let isCancelled = false
  let startTimestamp: number
  let finallyCallback: () => void

  const promise: any = new Promise(resolve => {
    const animationStep = (timestamp: number) => {
      if (isCancelled) {
        if (finallyCallback) {
          finallyCallback()
        }
        return
      }

      if (!startTimestamp) {
        // Save initial timestamp
        startTimestamp = timestamp
      }

      // Assure 0 <= progress <= 1
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      fn(easingFn(progress))

      if (progress < 1) {
        window.requestAnimationFrame(animationStep) // Request next animation frame
      } else {
        resolve()
      }
    }

    window.requestAnimationFrame(animationStep)
  })

  promise.cancel = () => {
    isCancelled = true
    return promise
  }

  promise.finally = (cb: () => void) => {
    finallyCallback = cb
    return promise
  }

  return promise as AnimatePromise
}

export const tweenFromTo = (
  from: number,
  to: number,
  fn: (t: number) => void,
  duration: number,
  easingFn: (t: number) => number
) => {
  const fromToFn = (progress: number) => {
    const delta = to - from
    fn(from + delta * progress)
  }

  return tween(fromToFn, duration, easingFn)
}
