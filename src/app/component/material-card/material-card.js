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
  selected = false,
  image,
  onMoreClick = noop,
  onSelectClick = noop,
  onUnavailableClick,
  selectLabel = 'Select',
  learnMoreLabel = 'Learn more',
  unavailableLabel = 'Not printable',
  contactUsLabel = 'Contact Us'
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
            <div className="MaterialCard__unavailableText">{unavailableLabel}</div>
            <Button minor tiny label={contactUsLabel} onClick={onUnavailableClick} />
          </footer>
        ) : (
          <footer className="MaterialCard__footer">
            {price && cloneElement(price, {loading})}
            <Button minor tiny label={selectLabel} onClick={onSelectClick} />
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
  loading: PropTypes.bool,
  unavailable: PropTypes.bool,
  onMoreClick: PropTypes.func,
  onSelectClick: PropTypes.func,
  image: PropTypes.string,
  onUnavailableClick: PropTypes.func,
  learnMoreLabel: PropTypes.bool,
  unavailableLabel: PropTypes.bool,
  contactUsLabel: PropTypes.bool,
  selected: PropTypes.bool
}

export default MaterialCard
