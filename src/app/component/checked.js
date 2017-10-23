import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import checkedIcon from 'Icon/checked.svg'
import uncheckedIcon from 'Icon/unchecked.svg'

const Checked = ({classNames, modifiers = [], checked = false}) => (
  <span className={buildClassName('checked', [...modifiers, {checked}], classNames)}>
    <Icon source={checked ? checkedIcon : uncheckedIcon} />
  </span>
)

Checked.propTypes = {
  ...propTypes.component,
  checked: PropTypes.bool
}

export default Checked
