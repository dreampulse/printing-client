import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import debounce from 'lodash/debounce'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import closeIcon from '../../asset/icon/close.svg'
import searchIcon from '../../asset/icon/search.svg'

const SearchField = ({
  classNames,
  modifiers = [],
  setValue,
  onChange,
  debouncedOnChange,
  value,
  id,
  name,
  placeholder,
  disabled
}) => {
  const finalModifiers = [...modifiers, {disabled}]
  const hasValue = value && value.length > 0
  const handleChange = event => {
    const v = event.target.value
    setValue(v)
    debouncedOnChange(v)
  }
  const handleClearClick = () => {
    const v = ''
    setValue(v)
    onChange(v)
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
        <button type="button" className="search-field__clear" onClick={handleClearClick}>
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
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  debouncedOnChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

const enhance = compose(
  withHandlers({
    debouncedOnChange: props => debounce(props.onChange, 500)
  }),
  withState('value', 'setValue', '')
)

export default enhance(SearchField)
