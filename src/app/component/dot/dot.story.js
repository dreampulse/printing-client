import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Dot from '.'

storiesOf('Dot', module)
  .add('default', () => <Dot index={1} onClick={action('onClick')} />)
  .add('active', () => <Dot active index={1} onClick={action('onClick')} />)
