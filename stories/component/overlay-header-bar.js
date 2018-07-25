import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import OverlayHeaderBar from '../../src/app/component/overlay-header-bar'
import IconLink from '../../src/app/component/icon-link'
import ProviderProgressBar from '../../src/app/component/provider-progress-bar'

import helpIcon from '../../src/asset/icon/help.svg'
import placeholderIcon from '../../src/asset/icon/placeholder.svg'

storiesOf('Overlay Header Bar', module)
  .add('default', () => (
    <OverlayHeaderBar onClickClose={action('click close')} title="Overlay Header Bar">
      <ProviderProgressBar currentStep={1} totalSteps={3} />
    </OverlayHeaderBar>
  ))
  .add('with actions', () => (
    <OverlayHeaderBar
      onClickClose={action('click close')}
      title="Overlay Header Bar"
      actions={[
        <IconLink key="link1" modifiers={['invert']} icon={helpIcon} />,
        <IconLink key="link2" modifiers={['invert']} icon={placeholderIcon} />
      ]}
    >
      <ProviderProgressBar currentStep={1} totalSteps={3} />
    </OverlayHeaderBar>
  ))
