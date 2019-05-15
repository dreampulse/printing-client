import React from 'react'
import {storiesOf} from '@storybook/react'

import MaterialStepSection from '.'

storiesOf('MaterialStepSection', module)
  .add('default', () => (
    <MaterialStepSection number="1" label="Headline">
      Material Step Section content
    </MaterialStepSection>
  ))
  .add('fadeIn', () => (
    <MaterialStepSection number="1" label="Headline" fadeIn>
      Material Step Section content
    </MaterialStepSection>
  ))
