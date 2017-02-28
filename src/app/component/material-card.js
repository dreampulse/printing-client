import React, {cloneElement, PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Button from './button'
import Headline from './headline'
import Icon from './icon'
import Link from './link'

import shippingIcon from '../../asset/icon/shipping.svg'

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
  onSelectClick = () => {}
}) => {
  const buttonModifiers = ['block', {selected}]
  const selectedLabel = selected ? 'Selected' : 'Select'
  modifiers.push({
    unavailable
  })
  const availableFooter = (
    <footer className="material-card__footer">
      {price ? cloneElement(price, {loading}) : null}
      {
        shipping && !loading
        ? <div className="material-card__shipping"><Icon source={shippingIcon} /> {shipping} {info}</div>
        : <div className="material-card__shipping" />
      }
      <div className="material-card__color">{colorSelect}</div>
      <Button
        modifiers={buttonModifiers}
        onClick={onSelectClick}
        label={selectedLabel}
      />
    </footer>
  )

  const unavailableFooter = (
    <footer className="material-card__footer">
      <div className="material-card__unavailable">Not printable</div>
    </footer>
  )

  return (
    <article className={buildClassName('material-card', modifiers, classNames)}>
      <figure className="material-card__figure">
        <img src={image} className="material-card__image" alt="" />
      </figure>
      <div className="material-card__content">
        <header className="material-card__header">
          <Headline label={title} tag="h3" classNames={['u-margin-bottom-s']} />
          <small className="material-card__subline">{subline}</small>
        </header>
        <div className="material-card__body">
          {description} <Link onClick={onMoreClick} label="Learn more" />
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
  image: PropTypes.string.isRequired
}

export default MaterialCard
