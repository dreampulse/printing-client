import React from 'react'
import {storiesOf, action} from '@storybook/react'
import {withKnobs, number, boolean} from '@storybook/addon-knobs/react'

import AppLayout from '../../src/app/container-next/app-layout'

storiesOf('Container.AppLayout', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <AppLayout
      cartCount={number('cartCount', 0)}
      onGoToHome={action('onGoToHome')}
      showUploadButton={boolean('showUploadButton', true)}
      onUploadButtonClicked={action('onUploadButtonClicked')}
      onCartClicked={action('onCartClicked')}
      onHelpClicked={action('onHelpClicked')}
    >
      some-content
    </AppLayout>
  ))
