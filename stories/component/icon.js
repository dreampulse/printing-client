import React from 'react'
import {storiesOf} from '@storybook/react'

import Icon from '../../src/app/component/icon'

import icon from '../../src/asset/icon/placeholder.svg'

storiesOf('Icon', module).add('default', () => <Icon source={icon} />)
