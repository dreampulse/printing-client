import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderName from '.'

storiesOf('ProviderName', module).add('default', () => <ProviderName vendorId="imaterialise" />)
