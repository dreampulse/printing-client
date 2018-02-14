import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderImage from '../../src/app/component/provider-image'

storiesOf('Provider Image', module).add('default', () => (
  <ProviderImage slug="imaterialise" name="i.Materialise" />
))
