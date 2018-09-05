export const required = value => (value ? undefined : 'Required')

// Source: https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
export const email = value =>
  !value ||
  (value && !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value))
    ? 'Invalid email address'
    : undefined
