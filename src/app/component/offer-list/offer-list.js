import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferList = ({classNames, children, showMore = false, showMoreAction}) => (
  <section
    className={buildClassName('OfferList', {hasMore: !!showMoreAction, showMore}, classNames)}
  >
    <ul className="OfferList__offers">
      {React.Children.map(children, (offer, i) => (
        <li key={i} className="OfferList__offer">
          {offer}
        </li>
      ))}
    </ul>
    {showMoreAction && <div className="OfferList__more">{showMoreAction}</div>}
  </section>
)

OfferList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  showMore: PropTypes.bool,
  showMoreAction: PropTypes.node
}

export default OfferList
