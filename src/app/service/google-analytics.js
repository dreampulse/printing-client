// @flow

const ga = global.ga

export const track = (action: string): void => {
  ga('send', 'event', 'printing-engine-client', action)
}
