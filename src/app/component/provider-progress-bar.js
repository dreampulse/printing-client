import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import LoadingIndicator from './loading-indicator'
import Icon from './icon'

import selectedIcon from '../../asset/icon/selected.svg'

const ProviderProgressBar = ({classNames, modifiers, currentStep, totalSteps}) => (
  <div className={buildClassName('provider-progress-bar', modifiers, classNames)}>
    <div className="provider-progress-bar__content">
      {(totalSteps === 0 || currentStep < totalSteps) && <LoadingIndicator />}
      {totalSteps > 0 && currentStep === totalSteps && <Icon source={selectedIcon} />}
      {totalSteps > 0 && `Checked ${currentStep} of ${totalSteps} providers`}
      {totalSteps === 0 && 'Loading…'}
    </div>
    {totalSteps > 0 && (
      <div
        className="provider-progress-bar__bar"
        style={{
          transform: `scaleX(${currentStep / totalSteps})`,
          WebkitTransform: `scaleX(${currentStep / totalSteps})`
        }}
      />
    )}
  </div>
)

ProviderProgressBar.propTypes = {
  ...propTypes.component,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
}

export default ProviderProgressBar
