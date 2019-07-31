import PropTypes from 'prop-types'
import React, {createElement} from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import selectedIcon from '../../../asset/icon/selected.svg'

const Button = ({
  classNames,
  label,
  icon,
  type = 'button',
  disabled = false,
  minor = false,
  tiny = false,
  compact = false,
  text = false,
  block = false,
  selected = false,
  iconOnly = false,
  onClick = noop,
  asLink = false,
  href = undefined,
  target = undefined
}) => {
  const finalIcon = selected ? selectedIcon : icon

  return createElement(
    asLink ? 'a' : 'button',
    {
      className: cn('Button', {minor, tiny, compact, text, block, selected, iconOnly}, classNames),
      type: asLink ? undefined : type,
      disabled: asLink ? undefined : disabled,
      onClick,
      href,
      target
    },
    <>
      {finalIcon && <Icon source={finalIcon} />}
      {label && <span className="Button__label">{label}</span>}
    </>
  )
}

Button.propTypes = {
  ...propTypes.component,
  label: PropTypes.string,
  icon: PropTypes.shape({
    id: PropTypes.string
  }),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  minor: PropTypes.bool,
  tiny: PropTypes.bool,
  compact: PropTypes.bool,
  text: PropTypes.bool,
  block: PropTypes.bool,
  selected: PropTypes.bool,
  iconOnly: PropTypes.bool,
  asLink: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string
}

export default Button
