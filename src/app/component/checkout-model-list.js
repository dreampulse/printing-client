import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Headline from './headline'

const CheckoutModelList = ({classNames, modifiers = [], editLink, headline, children}) => (
  <section className={buildClassName('checkout-model-list', modifiers, classNames)}>
    <div className="checkout-model-list__head">
      <Headline modifiers={['minor', 'l']} label={headline} />
      {editLink}
    </div>
    <ul className="checkout-model-list__list">
      {React.Children.map(children, child => <li>{child}</li>)}
    </ul>
  </section>
)

CheckoutModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  editLink: PropTypes.node,
  headline: PropTypes.string.isRequired
}

export default CheckoutModelList
