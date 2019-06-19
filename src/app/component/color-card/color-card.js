import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Button from '../button'

const ColorCard = ({
  classNames,
  colorTrait,
  title,
  price,
  loading = false,
  unavailable = false,
  selected = false,
  onSelectClick = noop,
  onUnavailableClick = noop,
  selectLabel = 'Select',
  selectedLabel = 'Selected',
  unavailableLabel = 'Not printable',
  contactUsLabel = 'Contact us'
}) => (
  <div className={cn('ColorCard', {unavailable, selected}, classNames)}>
    <div className="ColorCard__content" onClick={onSelectClick}>
      <div className="ColorCard__colorTrait">{colorTrait}</div>
      <div className="ColorCard__title">{title}</div>
    </div>
    {unavailable ? (
      <div className="ColorCard__footer">
        <span className="ColorCard__unavailableText">{unavailableLabel}</span>
        <Button block minor tiny label={contactUsLabel} onClick={onUnavailableClick} />
      </div>
    ) : (
      <div className="ColorCard__footer">
        {price && cloneElement(price, {loading})}
        <Button
          block
          minor={!selected}
          tiny
          disabled={loading}
          selected={selected}
          label={selected ? selectedLabel : selectLabel}
          onClick={onSelectClick}
        />
      </div>
    )}
  </div>
)

ColorCard.propTypes = {
  ...propTypes.component,
  title: PropTypes.string.isRequired,
  price: PropTypes.node.isRequired,
  colorTrait: PropTypes.node.isRequired,
  onUnavailableClick: PropTypes.func,
  unavailableLabel: PropTypes.string,
  contactUsLabel: PropTypes.string,
  selectLabel: PropTypes.string,
  selectedLabel: PropTypes.string,
  selected: PropTypes.bool
}

export default ColorCard
