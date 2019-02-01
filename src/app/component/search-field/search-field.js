import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import closeIcon from '../../../asset/icon/close.svg'
import searchIcon from '../../../asset/icon/search.svg'

const SearchField = ({
  classNames,
  modifiers = [],
  onChange = () => {},
  onClearClick = () => {},
  value = '',
  id,
  name,
  placeholder,
  disabled
}) => {
  const finalModifiers = [...modifiers, {disabled}]
  const hasValue = value && value.length > 0
  const handleChange = event => {
    onChange(event.target.value, name, event)
  }

  return (
    <div className={buildClassName('search-field', finalModifiers, classNames)}>
      <input
        id={id}
        name={name}
        className="search-field__input"
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      {hasValue && (
        <button type="button" className="search-field__clear" onClick={onClearClick}>
          <Icon source={closeIcon} title="Clear" />
        </button>
      )}
      {!hasValue && (
        <span className="search-field__search" aria-hidden>
          <Icon source={searchIcon} />
        </span>
      )}
    </div>
  )
}

SearchField.propTypes = {
  ...propTypes.component,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClearClick: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

export default SearchField
