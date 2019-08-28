import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Button from '../button'
import Headline from '../headline'
import Link from '../link'

const MaterialCard = ({
  classNames,
  price,
  title,
  description,
  loading = false,
  unavailable = false,
  selected = false,
  hasPriceSubline = false,
  image,
  onMoreClick = noop,
  onSelectClick = noop,
  onUnavailableClick = noop,
  descriptionHeadline,
  selectLabel = 'Select',
  selectedLabel = 'Selected',
  learnMoreLabel = 'Learn more',
  unavailableLabel = 'Not printable',
  contactUsLabel = 'Contact us',
  priceSublineLabel = ''
}) => {
  const imageStyle = {
    backgroundImage: `url(${image})`
  }

  return (
    <div
      className={cn(
        'MaterialCard',
        {
          unavailable,
          selected,
          hasPriceSubline
        },
        classNames
      )}
    >
      {image && <div className="MaterialCard__image" style={imageStyle} />}
      <div className="MaterialCard__content">
        <div className="MaterialCard__header" onClick={onSelectClick}>
          <Headline label={title} tag="strong" />
        </div>
        {Boolean(description) && (
          <div className="MaterialCard__body">
            <div className="MaterialCard__descriptionHeadline">{descriptionHeadline}</div>
            {description}{' '}
            <Link
              onClick={event => {
                event.preventDefault()
                onMoreClick()
              }}
              label={learnMoreLabel}
            />
          </div>
        )}
        {unavailable ? (
          <div className="MaterialCard__footer">
            <span className="MaterialCard__unavailableText">{unavailableLabel}</span>
            <Button block minor tiny label={contactUsLabel} onClick={onUnavailableClick} />
          </div>
        ) : (
          <div className="MaterialCard__footer">
            <div>
              {price && cloneElement(price, {loading})}
              {hasPriceSubline && (
                <div className="MaterialCard__priceSubline">{priceSublineLabel}</div>
              )}
            </div>
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
    </div>
  )
}

MaterialCard.propTypes = {
  ...propTypes.component,
  price: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  descriptionHeadline: PropTypes.string,
  loading: PropTypes.bool,
  unavailable: PropTypes.bool,
  onMoreClick: PropTypes.func,
  onSelectClick: PropTypes.func,
  image: PropTypes.string,
  onUnavailableClick: PropTypes.func,
  learnMoreLabel: PropTypes.string,
  unavailableLabel: PropTypes.string,
  contactUsLabel: PropTypes.string,
  selectLabel: PropTypes.string,
  selectedLabel: PropTypes.string,
  priceSublineLabel: PropTypes.string,
  selected: PropTypes.bool,
  hasPriceSubline: PropTypes.bool
}

export default MaterialCard
