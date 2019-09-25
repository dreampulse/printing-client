import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ProviderImage from '.'

storiesOf('ProviderImage', module)
  .add('default', () => <ProviderImage src="http://placehold.it/200x200" alt="placeholder image" />)
  .add('inline', () => (
    <ProviderImage inline src="http://placehold.it/200x200" alt="placeholder image" />
  ))
  .add('onClick', () => (
    <ProviderImage
      inline
      onClick={action('onClick')}
      src="http://placehold.it/200x200"
      alt="placeholder image"
    />
  ))
