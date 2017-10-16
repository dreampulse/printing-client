import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import LoadingIndicator from 'Component/loading-indicator'
import Icon from 'Component/icon'

import selectedIcon from 'Icon/selected.svg'

const ProviderProgressBar = ({classNames, modifiers, currentStep, totalSteps}) => (
  <div className={buildClassName('provider-progress-bar', modifiers, classNames)}>
    <div className="provider-progress-bar__content">
      {currentStep < totalSteps && <LoadingIndicator />}
      {currentStep === totalSteps && <Icon source={selectedIcon} />}
      Checked {currentStep} of {totalSteps} providers
    </div>
    <div
      className="provider-progress-bar__bar"
      style={{
        transform: `scaleX(${currentStep / totalSteps})`,
        WebkitTransform: `scaleX(${currentStep / totalSteps})`
      }}
    />
  </div>
)

ProviderProgressBar.propTypes = {
  ...propTypes.component,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
}

export default ProviderProgressBar

