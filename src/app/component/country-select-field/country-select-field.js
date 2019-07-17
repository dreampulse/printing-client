import PropTypes from 'prop-types'
import React, {useRef, useState} from 'react'

import SelectField from '../select-field'
import SelectMenu from '../select-menu'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'
import {getCountriesMenu, getCountryName} from '../../service/country'
import Button from '../button'

const CountrySelectField = ({
  onChange,
  name,
  value,
  classNames,
  changeLabel,
  changedLabel,
  changeButtonLabel,
  ...rest
}) => {
  const {current: initialValue} = useRef(value)
  const [editMode, setEditMode] = useState(false)

  const changeCountry = val => onChange(val.value, name)
  const val = !value || value === '' ? undefined : {value, label: getCountryName(value)}
  const countryMenu = <SelectMenu values={getCountriesMenu()} />

  const renderEditMode = () => (
    <>
      <SelectField
        warning
        menu={countryMenu}
        value={val}
        onChange={changeCountry}
        name={name}
        {...rest}
      />
      {
        <div className="countrySelectField__notification">
          {initialValue !== value ? changedLabel : changeLabel}
        </div>
      }
    </>
  )

  const renderReadMode = () => (
    <div className="countrySelectField__readMode">
      <div>{value ? getCountryName(value) : '-'}</div>
      <Button text tiny label={changeButtonLabel} onClick={() => setEditMode(true)} />
    </div>
  )

  return (
    <div className={cn('countrySelectField', {}, classNames)}>
      {editMode ? renderEditMode() : renderReadMode()}
    </div>
  )
}

CountrySelectField.propTypes = {
  ...propTypes.component,
  changedLabel: PropTypes.string.isRequired,
  changeLabel: PropTypes.string.isRequired,
  changeButtonLabel: PropTypes.string.isRequired
}

export default CountrySelectField
