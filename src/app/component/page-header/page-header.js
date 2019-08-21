import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Headline from '../headline'

const PageHeader = ({classNames, label, backLink, action}) => (
  <div className={cn('PageHeader', {}, classNames)}>
    <div className="PageHeader__title">
      <Headline size="xl" light label={label} />
      {action && <div className="PageHeader__action">{action}</div>}
    </div>
    {backLink}
  </div>
)

PageHeader.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  backLink: PropTypes.node,
  action: PropTypes.node
}

export default PageHeader
