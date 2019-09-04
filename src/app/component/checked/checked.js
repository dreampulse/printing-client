import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import checkedReoundIcon from '../../../asset/icon/checked-round.svg'
import uncheckedIcon from '../../../asset/icon/unchecked.svg'

const Checked = ({classNames, checked = false}) => (
  <span className={cn('Checked', {checked}, classNames)}>
    <Icon source={checked ? checkedReoundIcon : uncheckedIcon} />
  </span>
)

Checked.propTypes = {
  ...propTypes.component,
  checked: PropTypes.bool
}

export default Checked
