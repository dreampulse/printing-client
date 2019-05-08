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
  info,
  title,
  description,
  loading = false,
  unavailable = false,
  image,
  onMoreClick = noop,
  onSelectClick = noop,
  onUnavailableClick = noop,
  descriptionHeadline,
  selectLabel = 'Select',
  learnMoreLabel = 'Learn more',
  unavailableLabel = 'Not printable',
  contactUsLabel = 'Contact us'
}) => {
  const imageStyle = {
    backgroundImage: `url(${image})`
  }

  return (
    <article
      className={cn(
        'MaterialCard',
        {
          unavailable
        },
        classNames
      )}
    >
      {image && <div className="MaterialCard__image" style={imageStyle} />}
      <div className="MaterialCard__content">
        <header className="MaterialCard__header">
          {info}
          <Headline label={title} tag="strong" />
        </header>
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
          <footer className="MaterialCard__footer">
            <span className="MaterialCard__unavailableText">{unavailableLabel}</span>
            <Button
              minor
              tiny
              label={contactUsLabel}
              disabled={loading}
              onClick={onUnavailableClick}
            />
          </footer>
        ) : (
          <footer className="MaterialCard__footer">
            {price && cloneElement(price, {loading})}
            <Button minor tiny label={selectLabel} disabled={loading} onClick={onSelectClick} />
          </footer>
        )}
      </div>
    </article>
  )
}

MaterialCard.propTypes = {
  ...propTypes.component,
  price: PropTypes.node,
  info: PropTypes.node,
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
  selectLabel: PropTypes.string
}

export default MaterialCard
