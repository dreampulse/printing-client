import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import invert from '../decorator/invert'

import Logo from '../../src/app/component/logo'

storiesOf('Logo', module)
  .addDecorator(invert)
  .add('default', () => <Logo onClick={action('click')} />)
