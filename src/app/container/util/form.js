import React from 'react'
import memoize from 'lodash/memoize'
import omit from 'lodash/omit'

// See https://github.com/erikras/redux-form/issues/1425
export const renderField = memoize(Component => (props) => {
  const {modifiers = []} = props
  if (props.meta.invalid && props.meta.touched) {
    modifiers.push('error')
  }

  return (
    <Component
      modifiers={modifiers}
      {...props.input}
      {...omit(props, ['input', 'meta'])}
    />
  )
})
