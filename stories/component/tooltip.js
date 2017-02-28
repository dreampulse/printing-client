import React from 'react'
import {storiesOf} from '@kadira/storybook'
import centered from '@kadira/react-storybook-decorator-centered'

import Tooltip from 'Component/tooltip'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'

storiesOf('Tooltip', module)
  .addDecorator(centered)
  .add('default', () => (
    <Tooltip>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Tooltip>
  ))
  .add('right', () => (
    <Tooltip modifiers={['right']}>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Tooltip>
  ))
