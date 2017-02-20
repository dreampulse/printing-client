import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

storiesOf('Info', module)
  .add('default', () => (
    <Info>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Info>
  ))
