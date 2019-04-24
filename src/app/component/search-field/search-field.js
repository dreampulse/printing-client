import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import closeIcon from '../../../asset/icon/close.svg'
import searchIcon from '../../../asset/icon/search.svg'

const SearchField = ({
  classNames,
  onChange = () => {},
  onClearClick = () => {},
  value = '',
  id,
  name,
  placeholder,
  disabled = false,
  tiny = false
}) => {
  const hasValue = value && value.length > 0
  const handleChange = event => {
    onChange(event.target.value, name, event)
  }

  return (
    <div className={cn('SearchField', {disabled, tiny}, classNames)}>
      <input
        id={id}
        name={name}
        className="SearchField__input"
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      {hasValue && (
        <button type="button" className="SearchField__clear" onClick={onClearClick}>
          <Icon source={closeIcon} title="Clear" block />
        </button>
      )}
      {!hasValue && (
        <span className="SearchField__search" aria-hidden>
          <Icon source={searchIcon} block />
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
  disabled: PropTypes.bool,
  tiny: PropTypes.bool
}

export default SearchField
