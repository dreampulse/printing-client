import React from 'react'
import {storiesOf} from '@kadira/storybook'
import Grid from '../../app/component/grid'
import Column from '../../app/component/column'

storiesOf('Grid & Column', module)
  .add('default', () => (
    <Grid>
      <Column md={6} lg={4}>
        <div style={{backgroundColor: '#eee'}}>
          Column 1
        </div>
      </Column>
      <Column md={6} lg={4}>
        <div style={{backgroundColor: '#eee'}}>
          Column 2
        </div>
      </Column>
      <Column md={12} lg={4}>
        <div style={{backgroundColor: '#eee'}}>
          Column 3
        </div>
      </Column>
    </Grid>
  ))

