import React from 'react'
import {storiesOf} from '@storybook/react'

import MaterialStepSection from '.'
import Headline from '../headline'

storiesOf('MaterialStepSection', module)
  .add('default', () => (
    <MaterialStepSection headline={<Headline modifiers={['xl', 'light']} label="Headline" />}>
      Material Step Section content
    </MaterialStepSection>
  ))
  .add('fadeIn', () => (
    <MaterialStepSection
      headline={<Headline modifiers={['xl', 'light']} label="Headline" />}
      fadeIn
    >
      Material Step Section content
    </MaterialStepSection>
  ))
