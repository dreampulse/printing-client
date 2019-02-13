import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ColorCard = ({classNames, colorTrait, title, price, button}) => (
  <div className={cn('ColorCard', {}, classNames)}>
    <div className="ColorCard__firstRow">
      <div className="ColorCard__colorTrait">{colorTrait}</div>
      <div className="ColorCard__title">{title}</div>
    </div>
    <div className="ColorCard__secondRow">
      <div className="ColorCard__price">{price}</div>
      <div>{button}</div>
    </div>
  </div>
)

ColorCard.propTypes = {
  ...propTypes.component,
  title: PropTypes.string.isRequired,
  price: PropTypes.node.isRequired,
  button: PropTypes.node.isRequired,
  colorTrait: PropTypes.node.isRequired
}

export default ColorCard
