// TODO: warning! This should be used on the address page
export const normalizeTelephoneNumber = value => value.replace(/[()\s-/]/g, '').replace(/^\+/, '00')
