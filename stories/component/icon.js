import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Icon from 'Component/icon'

import icon from 'Icon/placeholder.svg'

storiesOf('Icon', module)
  .add('default', () => (
    <Icon source={icon} />
  ))
