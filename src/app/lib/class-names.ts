export default function classNames(
  componentName: string,
  modifiers: {
    [key: string]: any
  } = {},
  utils: string[] = []
): string {
  const modifiersList = Object.keys(modifiers)
    .reduce(
      (accumulator: string[], name: string) =>
        Boolean(modifiers[name]) ? [...accumulator, name] : accumulator,
      []
    )
    .map((name: string) => `${componentName}--${name}`)

  return [componentName, ...modifiersList, ...utils].join(' ')
}
