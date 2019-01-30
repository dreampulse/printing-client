import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Info from '../info'
import Button from '../button'
import Paragraph from '../paragraph'

const ProviderList = ({classNames, modifiers = [], children, onShowOffers = noop}) => (
  <div className={buildClassName('provider-list', modifiers, classNames)}>
    <table className="provider-list__table">
      <thead>
        <tr className="provider-list__header">
          <th className="provider-list__provider">Material</th>
          <th className="provider-list__time">
            Delivery time
            <Info modifiers={['minor']}>
              <Paragraph>
                Production time is an estimate based on similar orders. Actual production time may
                vary due to model analysis, reprints, and quality control.
              </Paragraph>
            </Info>
          </th>
          <th className="provider-list__price">Price</th>
          <th className="provider-list__action" />
        </tr>
      </thead>
      <tbody>
        {modifiers.includes('hidden')
          ? React.Children.toArray(children).filter((_, index) => index < 2)
          : children}
      </tbody>
    </table>
    <div className="provider-list__gradient">
      <Button label="See all offers" minor onClick={onShowOffers} />
    </div>
  </div>
)

ProviderList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  onShowOffers: PropTypes.func
}

export default ProviderList
