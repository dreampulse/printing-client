const ga = window.ga

export const track = (action: string): void => {
  if (ga) {
    ga('send', 'event', 'printing-engine-client', action)
  }
}
