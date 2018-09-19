import React from 'react'
import {storiesOf} from '@storybook/react'

import Icon from '.'

import icon from '../../../asset/icon/placeholder.svg'

storiesOf('Icon', module)
  .add('default', () => <Icon source={icon} />)
  .add('block', () => <Icon source={icon} modifiers={['block']} />)
