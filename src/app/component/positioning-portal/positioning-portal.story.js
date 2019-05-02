import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'
import {action} from '@storybook/addon-actions'

import PositioningPortal from '.'
import Button from '../button'

storiesOf('PositioningPortal', module)
  .add(
    'default',
    withState({isOpen: false}, store => (
      <PositioningPortal
        isOpen={store.state.isOpen}
        onOpen={action('onOpen')}
        onShouldClose={() => store.set({isOpen: false})}
        portalContent={<Button onClick={() => store.set({isOpen: false})} label="Close portal" />}
      >
        <Button onClick={() => store.set({isOpen: true})} label="Open portal" />
      </PositioningPortal>
    ))
  )
  .add(
    'scrollable test',
    withState({isOpen: false}, store => (
      <div style={{margin: '95vh 95vw', display: 'inline-block'}}>
        <PositioningPortal
          isOpen={store.state.isOpen}
          onOpen={action('onOpen')}
          onShouldClose={() => store.set({isOpen: false})}
          portalContent={<Button onClick={() => store.set({isOpen: false})} label="Close portal" />}
        >
          <Button onClick={() => store.set({isOpen: true})} label="Open portal" />
        </PositioningPortal>
      </div>
    ))
  )
