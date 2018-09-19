import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MagnifyableItem from '.'

const Item = () => <div style={{height: '300px'}} />

storiesOf('Magnifyable Item', module).add('default', () => (
  <div style={{width: '50%', backgroundColor: 'black'}}>
    <MagnifyableItem ariaLabel="Magnify that item" onClick={action('click')}>
      <Item />
    </MagnifyableItem>
  </div>
))
