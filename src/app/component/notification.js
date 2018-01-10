import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import warningIcon from '../../asset/icon/warning.svg'
import checkIcon from '../../asset/icon/checked.svg'

const Notification = ({classNames, modifiers = [], message, warning = false, button, children}) => {
  const finalModifiers = [
    ...modifiers,
    {
      warning
    }
  ]
  return (
    <div className={buildClassName('notification', finalModifiers, classNames)}>
      <div className="notification__icon">
        {warning ? <Icon source={warningIcon} /> : <Icon source={checkIcon} />}
      </div>
      <div className="notification__message">{message}</div>
      {children && <div className="notification__body">{children}</div>}
      {button && <div className="notification__button">{button}</div>}
    </div>
  )
}

Notification.propTypes = {
  ...propTypes.component,
  message: PropTypes.string.isRequired,
  warning: PropTypes.bool,
  button: PropTypes.node,
  children: PropTypes.node
}

export default Notification
