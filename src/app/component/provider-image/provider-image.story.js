import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderImage from '.'

storiesOf('ProviderImage', module).add('default', () => (
  <ProviderImage src="http://placehold.it/200x200" alt="placeholder image" />
))
