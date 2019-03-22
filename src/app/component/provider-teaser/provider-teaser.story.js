import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderTeaser from '.'
import ProviderImage from '../provider-image'

storiesOf('Provider Teaser', module)
  .add('default', () => (
    <ProviderTeaser>
      <ProviderImage slug="shapeways" />
      <ProviderImage slug="imaterialise" />
      <ProviderImage slug="sculpteo" />
      <ProviderImage slug="trinckle" />
      <ProviderImage slug="treatstock" />
      <ProviderImage slug="facfox" />
      <ProviderImage slug="jawstec" />
      <ProviderImage slug="zverse" />
    </ProviderTeaser>
  ))
  .add('left', () => (
    <ProviderTeaser modifiers={['left']}>
      <ProviderImage slug="shapeways" />
      <ProviderImage slug="imaterialise" />
      <ProviderImage slug="sculpteo" />
      <ProviderImage slug="trinckle" />
      <ProviderImage slug="treatstock" />
      <ProviderImage slug="facfox" />
      <ProviderImage slug="jawstec" />
      <ProviderImage slug="zverse" />
    </ProviderTeaser>
  ))
