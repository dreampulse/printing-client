import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderImage from '.'

storiesOf('Provider Image', module)
  .add('default', () => <ProviderImage slug="imaterialise" name="i.Materialise" />)
  .add('s', () => <ProviderImage modifiers={['s']} slug="imaterialise" name="i.Materialise" />)
