import React from 'react'
import memoize from 'lodash/memoize'
import omit from 'lodash/omit'
import get from 'lodash/get'

// See https://github.com/erikras/redux-form/issues/1425
export const renderField = memoize(Component => props => {
  const {modifiers = []} = props
  if (props.meta.invalid && props.meta.touched) {
    modifiers.push('error')
  }

  return (
    <Component
      modifiers={modifiers}
      {...props.input}
      {...omit(props, ['input', 'meta'])}
      onChange={e => {
        props.input.onChange(e)
        if (props.onChangeValue && typeof props.onChangeValue === 'function') {
          props.onChangeValue(props.input.value, props.input.name)
        }
      }}
    />
  )
})

export const renderFormikField = memoize(InputComponent => ({field, form, ...props}) => {
  const {modifiers = []} = props

  if (get(form.errors, field.name) && get(form.errors, field.name)) {
    modifiers.push('error')
  }

  return (
    <InputComponent
      {...field}
      {...props}
      modifiers={modifiers}
      checked={Boolean(field.value)}
      onChange={e => {
        if (props.onChangeValue && typeof props.onChangeValue === 'function') {
          props.onChangeValue(!field.value, field.name)
        }
        field.onChange(e)
      }}
      onBlur={form.handleBlur}
    />
  )
})
