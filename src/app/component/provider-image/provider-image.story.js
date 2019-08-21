import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderImage from '.'

storiesOf('ProviderImage', module)
  .add('default', () => <ProviderImage slug="imaterialise" name="i.Materialise" />)
  .add('s', () => <ProviderImage s slug="imaterialise" name="i.Materialise" />)
  .add('xs', () => <ProviderImage xs slug="imaterialise" name="i.Materialise" />)
