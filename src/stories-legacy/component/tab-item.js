import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import TabItem from '../../app/component-legacy/tab-item'
import icon from '../../asset-legacy/icon/placeholder.svg'

storiesOf('Tab Item', module)
  .add('default', () => (
    <TabItem value="Tab Item" label="Tab Item" onClick={action('click')} />
  ))
  .add('active', () => (
    <TabItem value="Tab Item" modifiers={['active']} label="Active Tab Item" onClick={action('click')} />
  ))
  .add('with icon', () => (
    <TabItem value="Tab Item" icon={icon} label="Tab Item with icon" onClick={action('click')} />
  ))
