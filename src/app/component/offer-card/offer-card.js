import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferCard = ({
  classNames,
  icon,
  label,
  mainValue,
  subline,
  children,
  footerContent,
  action
}) => (
  <div className={buildClassName('OfferCard', {}, classNames)}>
    <div className="OfferCard__header">
      {icon}
      <div className="OfferCard__headerContent">
        <div className="OfferCard__label">
          {label}: <strong className="OfferCard__mainValue">{mainValue}</strong>
        </div>
        <div className="OfferCard__subline">{subline}</div>
      </div>
    </div>
    <div className="OfferCard__content">{children}</div>
    <div className="OfferCard__footer">
      {footerContent}
      {action}
    </div>
  </div>
)

OfferCard.propTypes = {
  ...propTypes.component,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  mainValue: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node.isRequired,
  action: PropTypes.node.isRequired
}

export default OfferCard
