import React from 'react'
import {storiesOf} from '@storybook/react'

import Checked from 'Component/checked'

storiesOf('Checked', module)
  .add('default', () => <Checked />)
  .add('checked', () => <Checked checked />)
