import React from 'react'
import {storiesOf} from '@storybook/react'

import Filename from '.'

storiesOf('FileName', module).add('default', () => (
  <Filename name="Some very long file name" extension="obj" />
))
