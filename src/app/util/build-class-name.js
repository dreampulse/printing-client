import cn from 'classnames'

export default function buildClassName (componentName, modifiers = [], classNames = []) {
  return cn(
    componentName,
    ...(modifiers.map(m => componentName + '--' + m)),
    ...classNames
  )
}
