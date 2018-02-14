import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderDefinitionList from '../../src/app/component/provider-definition-list'

const providerValues = {
  'Provider Name': ['Value 1', 'Value 2'],
  'Provider Name 1': ['Value 3', 'Value 4']
}

storiesOf('ProviderDefinitionList', module).add('default', () => (
  <ProviderDefinitionList providerValues={providerValues} />
))
