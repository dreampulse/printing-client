export const required = (value: string) => (value ? undefined : 'Required')

// Source: https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
export const email = (value: string) =>
  !value ||
  (value && !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value))
    ? 'Invalid email address'
    : undefined

export const validateVat = (
  formValues: {shippingAddress: {countryCode: string}},
  euCountries: string[]
) => (value: string) => {
  return !value && euCountries.includes(formValues.shippingAddress.countryCode)
  ? 'Vat Id required'
    : undefined
}
