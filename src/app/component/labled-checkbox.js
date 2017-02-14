import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'
import InputCheckbox from './input-checkbox'

const LabledCheckbox = ({
  classNames,
  modifiers = [],
  checked,
  label,
  onChange = () => {},
  name = ''
}) => {
  const id = uniqueId('uid-')
  const inputModifiers = [modifiers.indexOf('error') > -1 ? 'error' : undefined]
  return (
    <div className={buildClassName('labled-checkbox', modifiers, classNames)}>
      <InputCheckbox
        name={name}
        modifiers={inputModifiers}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="labled-checkbox__label">{label}</label>
    </div>
  )
}

LabledCheckbox.propTypes = {
  ...propTypes.component,
  checked: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  name: React.PropTypes.string
}

export default LabledCheckbox
