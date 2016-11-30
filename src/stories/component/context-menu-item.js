import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ContextMenuItem from '../../app/component/context-menu-item'

import icon from '../../asset/icon/placeholder.svg'

storiesOf('Context Menu Item', module)
  .add('default', () => (
    <ContextMenuItem icon={icon} label='My Item' onClick={action('My Item clicked')} />
  ))
  .add('disabled', () => (
    <ContextMenuItem icon={icon} label='My Item' disabled onClick={action('My Item clicked')} />
  ))

