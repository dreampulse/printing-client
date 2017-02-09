import React from 'react'
import {storiesOf} from '@kadira/storybook'
import Icon from '../../app/component-legacy/icon'
import icon from '../../asset/icon/placeholder.svg'

storiesOf('Icon', module)
  .add('default', () => (
    <Icon source={icon} />
  ))
