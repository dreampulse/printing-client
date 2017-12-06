import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SliderButton from 'Component/slider-button'

storiesOf('SliderButton', module)
  .add('default', () => <SliderButton onClick={action('click')} />)
  .add('back', () => <SliderButton modifiers={['back']} onClick={action('click')} />)
