import React from 'react'
import memoize from 'lodash/memoize'
import get from 'lodash/get'

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
