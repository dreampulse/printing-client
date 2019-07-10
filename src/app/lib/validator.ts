export const required = (value: string) => (value ? undefined : 'Required')

// Source: https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
export const email = (value: string) =>
  !value ||
  (value && !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value))
    ? 'Invalid email address'
    : undefined

export const vat = (countryCode: string, euCountries: string[]) => (value: string) => {
  return !value && euCountries.includes(countryCode) ? 'Vat Id required' : undefined
}

export const phoneNumber = (value: string) =>
  !value || !value.replace(/\D/g, '') ? 'Invalid phone number' : undefined
