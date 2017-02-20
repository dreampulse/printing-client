import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Tooltip from '../../src/app/component/tooltip'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

const wrapperStyle = {
  backgroundColor: 'red',
  position: 'absolute',
  top: '200px',
  left: '400px',
  width: '10px',
  height: '10px'
};

storiesOf('Tooltip', module)
  .add('default', () => (
    <div style={wrapperStyle}>
      <Tooltip>
        <Headline modifiers={['s']} label="Headline" />
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Paragraph>
      </Tooltip>
    </div>
  ))
  .add('right', () => (
    <div style={wrapperStyle}>
      <Tooltip modifiers={['right']}>
        <Headline modifiers={['s']} label="Headline" />
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Paragraph>
      </Tooltip>
    </div>
  ))
