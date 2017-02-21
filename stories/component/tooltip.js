import React from 'react'
import {storiesOf} from '@kadira/storybook'
import centered from '@kadira/react-storybook-decorator-centered'

import Tooltip from '../../src/app/component/tooltip'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

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
