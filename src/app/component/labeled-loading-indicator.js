import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import LoadingIndicator from 'Component/loading-indicator'

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
