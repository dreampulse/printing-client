// Easing functions (source: https://gist.github.com/gre/1650294)

// No easing, no acceleration
export const easeLinear = t => t
// Acceleration until halfway, then deceleration
export const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const tween = (duration, fn, easingFn = easeLinear) => {
  let isRunning = true
  let startTimestamp

  const animationStep = timestamp => {
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
      global.requestAnimationFrame(animationStep) // Request next animation frame
    }
  }

  global.requestAnimationFrame(animationStep)

  return {
    isRunning() {
      return isRunning
    },
    abort() {
      isRunning = false
    }
  }
}

export const tweenFromTo = (from, to, duration, fn, easingFn) => {
  const fromToFn = progress => {
    const delta = to - from
    fn(from + delta * progress)
  }

  return tween(duration, fromToFn, easingFn)
}
