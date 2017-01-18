import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const TextAreaField = ({modifiers, classNames, label, value, ...params}) => {
  let textAreaModifiers = modifiers || []

  if (!value) {
    textAreaModifiers = [...textAreaModifiers, 'empty']
  }

  const id = uniqueId('uid-')

  return (
    <div className={buildClassName('text-area-field', textAreaModifiers, classNames)}>
      <textarea id={id} className="text-area-field__input" value={value} {...params} />
      <label htmlFor={id} className="text-area-field__label">{label}</label>
    </div>
  )
}

TextAreaField.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired
}

export default TextAreaField
