import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import checkIcon from '../../../asset/icon/selected.svg'

const CheckboxField = ({
  classNames,
  error = false,
  checked,
  id = '',
  onChange = noop,
  name = ''
}) => (
  <div className={cn('CheckboxField', {checked, error}, classNames)}>
    <input
      name={name}
      id={id}
      className="CheckboxField__input"
      type="checkbox"
      onChange={event => onChange(!checked, name, event)}
    />
    <div className="CheckboxField__checkedIcon">
      <Icon source={checkIcon} />
    </div>
  </div>
)

CheckboxField.propTypes = {
  ...propTypes.component,
  error: PropTypes.bool,
  checked: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
}

export default CheckboxField
