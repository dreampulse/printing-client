import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferFooter = ({classNames, children, showMore = false}) => {
  const [mainOffer, ...moreOffers] = React.Children.toArray(children)

  return (
    <section className={buildClassName('OfferFooter', {showMore}, classNames)}>
      <div className="OfferFooter__main">{mainOffer}</div>
      {moreOffers && (
        <div className="OfferFooter__more">
          <ul className="OfferFooter__offers">
            {moreOffers.map((offer, i) => (
              <li key={i} className="OfferFooter__offer">
                {offer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

OfferFooter.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  showMore: PropTypes.bool
}

export default OfferFooter
