import React from 'react'
import {storiesOf} from '@storybook/react'

import Icon from 'Component/icon'

import icon from 'Icon/placeholder.svg'

storiesOf('Icon', module)
  .add('default', () => <Icon source={icon} />)
  .add('block', () => <Icon source={icon} modifiers={['block']} />)
