import * as React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import PositioningPortalWithState from '../positioning-portal-with-state'
import Button from '../button'

storiesOf('PositioningPortalWithState', module).add('default', () => (
  <PositioningPortalWithState
    onOpen={action('onOpen')}
    onClose={action('onClose')}
    portalContent={({close}) => <Button onClick={close} label="Close portal" />}
  >
    {({open}) => <Button onClick={open} label="Open portal" />}
  </PositioningPortalWithState>
))
