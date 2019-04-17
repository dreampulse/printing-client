import React from 'react'
import {storiesOf} from '@storybook/react'

import StickyFooter from '.'

storiesOf('StickyFooter', module).add('default', () => (
  <StickyFooter>Sticky footer content</StickyFooter>
))
