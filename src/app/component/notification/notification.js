import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import warningIcon from '../../../asset/icon/warning.svg'
import checkIcon from '../../../asset/icon/checked.svg'

const Notification = ({classNames, message, type = 'default', button, children}) => (
  <div className={cn('Notification', {[`type-${type}`]: type}, classNames)}>
    <div className="Notification__title">
      <div className="Notification__icon">
        {type === 'warning' || type === 'error' ? (
          <Icon source={warningIcon} />
        ) : (
          <Icon source={checkIcon} />
        )}
      </div>
      <div className="Notification__message">{message}</div>
    </div>
    <div className="Notification__content">
      {children && <div className="Notification__body">{children}</div>}
      {button && <div className="Notification__button">{button}</div>}
    </div>
  </div>
)

Notification.propTypes = {
  ...propTypes.component,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'warning', 'error']),
  button: PropTypes.node,
  children: PropTypes.node
}

export default Notification
