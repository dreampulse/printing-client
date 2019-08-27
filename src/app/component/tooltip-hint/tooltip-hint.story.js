import React from 'react'
import {storiesOf} from '@storybook/react'

import TooltipHint from '.'
import TooltipBaloon from '../tooltip-baloon'
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
  <TooltipHint show tooltip={<TooltipBaloon position="bottom">Tooltip Content</TooltipBaloon>}>
    <Paragraph>{lorem}</Paragraph>
  </TooltipHint>
))
