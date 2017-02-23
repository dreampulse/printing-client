import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import LoadingIndicator from './loading-indicator'

const LabeledLoadingIndicator = ({classNames, modifiers, children}) => (
  <div className={buildClassName('labeled-loading-indicator', modifiers, classNames)}>
    <LoadingIndicator modifiers={['l']} />
    <p className="labeled-loading-indicator__text">
      {children}
    </p>
  </div>
)

LabeledLoadingIndicator.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default LabeledLoadingIndicator
