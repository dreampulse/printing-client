import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Headline from '../headline'

const PageHeader = ({classNames, modifiers, label, backLink, action}) => (
  <div className={buildClassName('page-header', modifiers, classNames)}>
    <div className="page-header__title">
      <Headline size="xl" light label={label} />
      {action && <div className="page-header__action">{action}</div>}
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
