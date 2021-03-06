// Heads up: Do not store intercom as a variable here because intercom replaces the Intercom property on runtime.
// It needs to be accessed via the global.Intercom reference.

const wellKnownIntercomMethodNames = ['boot', 'shutdown']

// We need to check if the given Intercom function is the actual Intercom function
// because ad-blockers replace the Intercom function with a stub function. Hence we check
// for well-known method names. This is the best we can do.
export const isIntercomBlocked = () => {
  const intercomImpl = window.Intercom.toString()
  return !wellKnownIntercomMethodNames.every(methodName => intercomImpl.includes(methodName))
}

const intercom = (cmd: string): void => {
  if (window.Intercom) {
    window.Intercom(cmd)
  }
}

export const openIntercom = (): void => {
  intercom('show')
}

export const handleIncomingMessages = (): void => {
  window.Intercom('onUnreadCountChange', (unreadCount: number) => {
    if (unreadCount !== 0) {
      window.Intercom('show')
    }
  })
}
