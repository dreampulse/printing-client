export default function buildClassName (componentName, modifiers = [], classNames = []) {
  const compactObject = obj =>
    Object.keys(obj)
      .reduce((last, cur) => (obj[cur] ? [...last, cur] : last), [])

  const unfoldObject = list =>
    list.reduce((last, cur) => {
      if (typeof cur === 'object') {
        return [...last, ...compactObject(cur)]
      } else if (typeof cur === 'undefined') {
        return last
      }
      return [...last, cur]
    }, [])

  const wrapList = className => (
    Array.isArray(className) ? className : [className]
  )

  const modifiersList = unfoldObject(wrapList(modifiers))
    .map(name => componentName + '--' + name)

  const classNameList = unfoldObject(wrapList(classNames))

  return [componentName, ...modifiersList, ...classNameList].join(' ')
}
