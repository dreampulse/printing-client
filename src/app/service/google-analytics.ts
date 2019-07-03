const ga = (...args: any[]) => {
  if (window.ga) {
    window.ga(...args)
  }
}

export const track = (action: string): void => {
  ga('send', 'event', 'printing-engine-client', action)
}

export const trackPageImpression = (path: string): void => {
  ga('set', 'page', path)
  ga('send', 'pageview')
}
