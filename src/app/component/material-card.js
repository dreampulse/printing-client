import PropTypes from 'prop-types'
import React, {cloneElement} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName, {buildClassArray} from 'Lib/build-class-name'

import Button from 'Component/button'
import Headline from 'Component/headline'
import Link from 'Component/link'

const MaterialCard = ({
  classNames,
  modifiers = [],
  price,
  info,
  title,
  description,
  colorSelect,
  loading = false,
  selected = false,
  unavailable = false,
  image,
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
      {colorSelect ? <div className="material-card__color">{colorSelect}</div> : null}
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
          <Headline label={title} tag="strong" />
          {info}
        </header>
        {Boolean(description) && (
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
        )}
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
  description: PropTypes.string,
  colorSelect: PropTypes.node,
  loading: PropTypes.bool,
  selected: PropTypes.bool,
  unavailable: PropTypes.bool,
  onMoreClick: PropTypes.func,
  onSelectClick: PropTypes.func,
  image: PropTypes.string,
  selectLabel: PropTypes.string
}

export default MaterialCard
