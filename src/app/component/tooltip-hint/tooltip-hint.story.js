import React from 'react'
import {storiesOf} from '@storybook/react'

import TooltipHint from '.'
import Tooltip from '../tooltip'
import Paragraph from '../paragraph'

const lorem = `
Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua. At vero eos et accusam
et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua.
`

storiesOf('TooltipHint', module).add('default', () => (
  <TooltipHint
    show
    tooltip={
      <Tooltip>
        <Paragraph>Tooltip Content</Paragraph>
      </Tooltip>
    }
  >
    <Paragraph>{lorem}</Paragraph>
  </TooltipHint>
))
