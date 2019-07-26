import React from 'react'
import memoize from 'lodash/memoize'
import get from 'lodash/get'

export const renderFormikField = memoize(InputComponent => ({field, form, ...props}) => (
  <InputComponent
    {...field}
    {...props}
    name={field.name}
    checked={Boolean(field.value)}
    error={Boolean(get(form.errors, field.name))}
    onChange={(value, name) => {
      if (props.onChangeValue && typeof props.onChangeValue === 'function') {
        props.onChangeValue(!field.value, field.name)
      }
      form.setFieldValue(name, value, true)
    }}
    onBlur={form.handleBlur}
  />
))
