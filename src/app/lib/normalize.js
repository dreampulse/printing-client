export const normalizeTelephoneNumber = value => value.replace(/[()\s-/]/g, '').replace(/^\+/, '00')
