// Easing functions (source: https://gist.github.com/gre/1650294)

// No easing, no acceleration
export const easeLinear = (t: number) => t
// Acceleration until halfway, then deceleration
export const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const tween = (duration: number, fn: (t: number) => void, easingFn = easeLinear) => {
  let isRunning = true
  let startTimestamp: number

  const animationStep = (timestamp: number) => {
    if (!isRunning) {
      return
    } // Early return, aborts animation

    if (!startTimestamp) {
      // Save initial timestamp
      startTimestamp = timestamp
    }

    let progress = (timestamp - startTimestamp) / duration

    if (progress > 1) {
      progress = 1
    } // Assure 0 <= progress <= 1

    fn(easingFn(progress))

    if (progress < 1) {
      window.requestAnimationFrame(animationStep) // Request next animation frame
    }
  }

  window.requestAnimationFrame(animationStep)

  return {
    isRunning() {
      return isRunning
    },
    abort() {
      isRunning = false
    }
  }
}

export const tweenFromTo = (
  from: number,
  to: number,
  duration: number,
  fn: (t: number) => void,
  easingFn: (t: number) => number
) => {
  const fromToFn = (progress: number) => {
    const delta = to - from
    fn(from + delta * progress)
  }

  return tween(duration, fromToFn, easingFn)
}
