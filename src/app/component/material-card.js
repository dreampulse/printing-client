import React, {cloneElement, PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Button from './button'
import Info from './info'
import Icon from './icon'
import Headline from './headline'
import Paragraph from './paragraph'

import shippingIcon from '../../asset/icon/shipping.svg'

const MaterialCard = ({
  classNames,
  modifiers = [],
  price,
  title,
  subline,
  description,
  colorSelect,
  loading = false,
  selected = false,
  unavailable = false,
  shipping,
  onMoreClick = () => {},
  onSelectClick = () => {}
}) => {
  const buttonModifiers = ['block']
  if (selected) buttonModifiers.push('selected')
  const selectedLabel = selected ? 'Selected' : 'Select'
  modifiers.push({
    unavailable
  })

  const info = (
    <Info>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Info>
  )

  const availableFooter = (
    <footer className="material-card__footer">
      {price ? cloneElement(price, {loading}) : null}
      {
        shipping && !loading
        ? <div className="material-card__shipping"><Icon source={shippingIcon} /> {shipping} {info}</div>
        : <div className="material-card__shipping" />
      }
      {colorSelect}
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
    <section className={buildClassName('material-card', modifiers, classNames)}>
      <figure className="material-card__figure">
        <img src="http://placehold.it/260x170/ff0000" className="material-card__image" alt="" />
      </figure>
      <div className="material-card__content">
        <header className="material-card__header">
          <h1 className="material-card__headline">{title}</h1>
          <small className="material-card__subline">{subline}</small>
        </header>
        <div className="material-card__body">
          {description} <button className="material-card__more" onClick={onMoreClick}>Learn more</button>
        </div>
        {unavailable ? unavailableFooter : availableFooter}
      </div>
    </section>
  )
}

MaterialCard.propTypes = {
  ...propTypes.component,
  price: PropTypes.node,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colorSelect: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  selected: PropTypes.bool,
  unavailable: PropTypes.bool,
  shipping: PropTypes.string,
  onMoreClick: PropTypes.func,
  onSelectClick: PropTypes.func
}

export default MaterialCard
