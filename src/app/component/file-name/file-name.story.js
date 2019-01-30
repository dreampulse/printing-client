import React from 'react'
import {storiesOf} from '@storybook/react'

import Filename from '.'

storiesOf('FileName', module).add('default', () => (
  <Filename fileName="pretty_long_filename_which_gets_truncated.obj" />
))
