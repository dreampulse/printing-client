import React from 'react'
import {storiesOf} from '@storybook/react'

import Checked from '../../src/app/component/checked'

storiesOf('Checked', module)
  .add('default', () => <Checked />)
  .add('checked', () => <Checked checked />)
