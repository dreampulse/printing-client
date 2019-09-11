/* tslint:disable */
interface Window {
  /* tslint:enable */
  ga: any
  Intercom: any
  Stripe: any
  mixpanel: any
  initMap: () => void
}

declare module 'country-list' {
  /* tslint:disable */
  interface CountryList {
    /* tslint:enable */
    getCodes: () => string[]
    getName: (name: string) => string
  }

  function constructor(): CountryList

  export = constructor
}

declare module '*.png'
