import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Logo from '.'

import invert from '../../../../stories/decorator/invert'

storiesOf('Logo', module)
  .addDecorator(invert)
  .add('default', () => <Logo onClick={action('click')} />)
