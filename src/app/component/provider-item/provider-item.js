import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import AnnotatedTableCell from '../annotated-table-cell'

const ProviderItem = ({
  classNames,
  modifiers,
  providerAnnotation,
  provider,
  timeAnnotation,
  time,
  priceAnnotation,
  price,
  action
}) => (
  <tr className={buildClassName('provider-item', modifiers, classNames)}>
    <td className="provider-item__provider">
      <AnnotatedTableCell annotation={providerAnnotation}>{provider}</AnnotatedTableCell>
    </td>
    <td className="provider-item__time">
      <AnnotatedTableCell annotation={timeAnnotation}>{time}</AnnotatedTableCell>
    </td>
    <td className="provider-item__price">
      <AnnotatedTableCell annotation={priceAnnotation}>{price}</AnnotatedTableCell>
    </td>
    <td className="provider-item__action">{action}</td>
  </tr>
)

ProviderItem.propTypes = {
  ...propTypes.component,
  providerAnnotation: PropTypes.node.isRequired,
  provider: PropTypes.node.isRequired,
  timeAnnotation: PropTypes.node.isRequired,
  time: PropTypes.node.isRequired,
  priceAnnotation: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
  action: PropTypes.node.isRequired,
  icons: PropTypes.node
}

export default ProviderItem
