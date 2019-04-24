import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import basketIcon from '../../../asset/icon/basket.svg'

const CartNavButton = ({
  classNames,
  label,
  count,
  disabled = false,
  onClick = noop,
  onHover = noop
}) => (
  <button
    disabled={disabled}
    type="button"
    className={cn('CartNavButton', {}, classNames)}
    onClick={onClick}
    onMouseEnter={onHover}
  >
    <div className="CartNavButton__icon">
      <span className="CartNavButton__count">{count > 9 ? '9+' : count}</span>
      <Icon source={basketIcon} />
    </div>
    {label && <span className="CartNavButton__label">{label}</span>}
  </button>
)

CartNavButton.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  disabled: PropTypes.bool,
  count: PropTypes.number
}

export default CartNavButton
