import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import OverlayHeaderBar from '../../src/app/component/overlay-header-bar'
import ProviderProgressBar from '../../src/app/component/provider-progress-bar'

storiesOf('Overlay Header Bar', module).add('default', () => (
  <OverlayHeaderBar onClickClose={action('click close')} title="Overlay Header Bar">
    <ProviderProgressBar currentStep={1} totalSteps={3} />
  </OverlayHeaderBar>
))
