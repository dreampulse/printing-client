import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import FullscreenOverlay from '../../src/app/component/fullscreen-overlay'

storiesOf('FullscreenOverlay', module)
  .add('default', () => (
    <FullscreenOverlay closePortal={action('onClose')}>
      <div>Overlay content</div>
    </FullscreenOverlay>
  ))
  .add('invert', () => (
    <FullscreenOverlay modifiers={['invert']} closePortal={action('onClose')}>
      <div className="u-invert" style={{width: '100%', minHeight: '100vh'}}>
        Overlay content
      </div>
    </FullscreenOverlay>
  ))
