const compactObject = (obj: {[className: string]: boolean}) =>
  Object.keys(obj).reduce<string[]>((last, cur) => (obj[cur] ? [...last, cur] : last), [])

const wrapList = (className: string | string[]) =>
  Array.isArray(className) ? className : [className]

const unfoldObject = (list: string[]) =>
  list.reduce<string[]>((last, cur) => {
    if (typeof cur === 'object') {
      return [...last, ...compactObject(cur)]
    } else if (typeof cur === 'undefined') {
      return last
    }
    return [...last, cur]
  }, [])

export function buildClassArray(classNames: string[]) {
  return unfoldObject(wrapList(classNames))
}

export default function buildClassName(
  componentName: string,
  modifiers: string[] = [],
  classNames: string[] = []
) {
  const modifiersList = buildClassArray(modifiers).map(name => `${componentName}--${name}`)

  const classNameList = buildClassArray(classNames)

  return [componentName, ...modifiersList, ...classNameList].join(' ')
}
