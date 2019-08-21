import React from 'react'
import {storiesOf} from '@storybook/react'

import Grid from '.'
import Column from '../column'

storiesOf('Grid & Column', module).add('default', () => (
  <Grid>
    <Column md={6} lg={4}>
      <div style={{background: '#ccc'}}>Column 1</div>
    </Column>
    <Column md={6} lg={4}>
      <div style={{background: '#ddd'}}>Column 2</div>
    </Column>
    <Column md={12} lg={4}>
      <div style={{background: '#eee'}}>Column 3</div>
    </Column>
  </Grid>
))
