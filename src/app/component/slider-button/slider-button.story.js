import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SliderButton from '.'

storiesOf('SliderButton', module)
  .add('default', () => <SliderButton onClick={action('onClick')} />)
  .add('back', () => <SliderButton back onClick={action('onClick')} />)
