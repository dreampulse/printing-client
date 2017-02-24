import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Headline from './headline'

const PageHeader = ({classNames, modifiers, label, backLink}) => (
  <div className={buildClassName('page-header', modifiers, classNames)}>
    <div className="page-header__title">
      <Headline modifiers={['xl']} label={label} />
    </div>
    {backLink}
  </div>
)

PageHeader.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  backLink: PropTypes.node
}

export default PageHeader
