interface Window {
  ga: any
  Intercom: any
  StripeCheckout: any
  mixpanel: any
  initMap: () => void
}

declare module 'country-list' {
  interface CountryList {
    getCodes: () => string[]
    getName: (name: string) => string
  }

  function constructor(): CountryList

  export = constructor
}

declare module 'raven-for-redux' {
  function constructor(raven: any, options: any): any

  export = constructor
}
