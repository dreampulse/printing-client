import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import checkedIcon from '../../../asset/icon/checked.svg'
import uncheckedIcon from '../../../asset/icon/unchecked.svg'

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
