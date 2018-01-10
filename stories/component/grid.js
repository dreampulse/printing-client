import React from 'react'
import {storiesOf} from '@storybook/react'

import Grid from '../../src/app/component/grid'
import Column from '../../src/app/component/column'

storiesOf('Grid & Column', module).add('default', () => (
  <Grid>
    <Column md={6} lg={4}>
      <div style={{background: '#fff'}}>Column 1</div>
    </Column>
    <Column md={6} lg={4}>
      <div style={{background: '#fff'}}>Column 2</div>
    </Column>
    <Column md={12} lg={4}>
      <div style={{background: '#fff'}}>Column 3</div>
    </Column>
  </Grid>
))
