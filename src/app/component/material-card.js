import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName, {buildClassArray} from 'Lib/build-class-name'

import Button from 'Component/button'
import Headline from 'Component/headline'
import Icon from 'Component/icon'
import Link from 'Component/link'

import shippingIcon from 'Icon/shipping.svg'

const MaterialCard = ({
  classNames,
  modifiers = [],
  price,
  info,
  title,
  subline,
  description,
  colorSelect,
  loading = false,
  selected = false,
  unavailable = false,
  image,
  shipping,
  onMoreClick = () => {},
  onSelectClick,
  selectLabel = 'Select'
}) => {
  const buttonModifiers = buildClassArray(['block', {selected}])
  const selectButtonLabel = selected ? 'Selected' : selectLabel
  modifiers.push({
    unavailable
  })
  const availableFooter = (
    <footer className="material-card__footer">
      {price ? cloneElement(price, {loading}) : null}
      {shipping && !loading ? (
        <div className="material-card__shipping">
          <Icon source={shippingIcon} /> {shipping} {info}
        </div>
      ) : (
        <div className="material-card__shipping" />
      )}
      <div className="material-card__color">{colorSelect}</div>
      <Button
        modifiers={buttonModifiers}
        disabled={!onSelectClick}
        onClick={onSelectClick}
        label={selectButtonLabel}
      />
    </footer>
  )

  const unavailableFooter = (
    <footer className="material-card__footer">
      <div className="material-card__unavailable">Not printable</div>
    </footer>
  )

  const imageStyle = {
    backgroundImage: `url(${image})`
  }

  return (
    <article className={buildClassName('material-card', modifiers, classNames)}>
      {image && <div className="material-card__image" style={imageStyle} />}
      <div className="material-card__content">
        <header className="material-card__header">
          <Headline label={title} tag="h3" classNames={['u-margin-bottom-s']} />
          <small className="material-card__subline">{subline}</small>
        </header>
        <div className="material-card__body">
          {description}{' '}
          <Link
            onClick={event => {
              event.preventDefault()
              onMoreClick()
            }}
            label="Learn more"
          />
        </div>
        {unavailable ? unavailableFooter : availableFooter}
      </div>
    </article>
  )
}

MaterialCard.propTypes = {
  ...propTypes.component,
  price: PropTypes.node,
  info: PropTypes.node,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colorSelect: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  selected: PropTypes.bool,
  unavailable: PropTypes.bool,
  shipping: PropTypes.string,
  onMoreClick: PropTypes.func,
  onSelectClick: PropTypes.func,
  image: PropTypes.string,
  selectLabel: PropTypes.string
}

export default MaterialCard
