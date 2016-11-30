import React, {PropTypes} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const Toggle = ({classNames, modifiers, label, value, ...params}) => {
  const id = uniqueId('uid-')

  return (
    <div className={buildClassName('toggle', modifiers, classNames)}>
      {label && <label htmlFor={id} className='toggle__label'>{label}</label>}
      <div className='toggle__wrapper'>
        <input
          id={id}
          className='toggle__input'
          type='checkbox'
          checked={value}
          {...params}
        />
        <div className='toggle__background' />
        <div className='toggle__knob' />
      </div>
    </div>
  )
}

Toggle.propTypes = {
  ...propTypes.component,
  label: PropTypes.string
}

export default Toggle
