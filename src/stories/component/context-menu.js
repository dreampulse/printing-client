import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ContextMenu from '../../app/component-legacy/context-menu'
import ContextMenuItem from '../../app/component-legacy/context-menu-item'
import Button from '../../app/component-legacy/button'

import icon from '../../asset/icon/placeholder.svg'

storiesOf('Context Menu', module)
  .add('default position', () => (
    <div style={{margin: 20}}>
      <ContextMenu
        menu={[
          <ContextMenuItem icon={icon} label="My Item" onClick={action('My Item clicked')} />,
          <ContextMenuItem icon={icon} label="My Item 2" onClick={action('My Item 2 clicked')} />
        ]}
      >
        <Button label="open" />
      </ContextMenu>
    </div>
  ))
  .add('right position', () => (
    <div style={{margin: 20, position: 'absolute', right: 0}}>
      <ContextMenu
        menu={[
          <ContextMenuItem icon={icon} label="My Item" onClick={action('My Item clicked')} />,
          <ContextMenuItem icon={icon} label="My Item 2" onClick={action('My Item 2 clicked')} />
        ]}
      >
        <Button label="open" />
      </ContextMenu>
    </div>
  ))
  .add('bottom position', () => (
    <div style={{margin: 20, position: 'absolute', bottom: 0}}>
      <ContextMenu
        menu={[
          <ContextMenuItem icon={icon} label="My Item" onClick={action('My Item clicked')} />,
          <ContextMenuItem icon={icon} label="My Item 2" onClick={action('My Item 2 clicked')} />
        ]}
      >
        <Button label="open" />
      </ContextMenu>
    </div>
  ))
  .add('bottom right position', () => (
    <div style={{margin: 20, position: 'absolute', bottom: 0, right: 0}}>
      <ContextMenu
        menu={[
          <ContextMenuItem icon={icon} label="My Item" onClick={action('My Item clicked')} />,
          <ContextMenuItem icon={icon} label="My Item 2" onClick={action('My Item 2 clicked')} />
        ]}
      >
        <Button label="open" />
      </ContextMenu>
    </div>
  ))

