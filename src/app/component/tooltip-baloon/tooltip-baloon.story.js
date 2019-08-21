import React from 'react'
import {storiesOf} from '@storybook/react'

import TooltipBalloon from './.'

storiesOf('TooltipBalloon', module)
  .add('default', () => (
    <TooltipBalloon>
      Lorem ipsum dolor, sit amet <strong>consectetur</strong> adipisicing elit.
    </TooltipBalloon>
  ))
  .add('position left', () => (
    <TooltipBalloon position="left">
      Lorem ipsum dolor, sit amet <strong>consectetur</strong> adipisicing elit.
    </TooltipBalloon>
  ))
  .add('position right', () => (
    <TooltipBalloon position="right">
      Lorem ipsum dolor, sit amet <strong>consectetur</strong> adipisicing elit.
    </TooltipBalloon>
  ))
  .add('position bottom', () => (
    <TooltipBalloon position="bottom">
      Lorem ipsum dolor, sit amet <strong>consectetur</strong> adipisicing elit.
    </TooltipBalloon>
  ))
