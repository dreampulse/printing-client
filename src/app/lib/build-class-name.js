const compactObject = obj =>
  Object.keys(obj).reduce((last, cur) => (obj[cur] ? [...last, cur] : last), [])

const wrapList = className => (Array.isArray(className) ? className : [className])

const unfoldObject = list =>
  list.reduce((last, cur) => {
    if (typeof cur === 'object') {
      return [...last, ...compactObject(cur)]
    } else if (typeof cur === 'undefined') {
      return last
    }
    return [...last, cur]
  }, [])

export function buildClassArray(classNames) {
  return unfoldObject(wrapList(classNames))
}

export default function buildClassName(componentName, modifiers = [], classNames = []) {
  const modifiersList = buildClassArray(modifiers).map(name => `${componentName}--${name}`)

  const classNameList = buildClassArray(classNames)

  return [componentName, ...modifiersList, ...classNameList].join(' ')
}
