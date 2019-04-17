import React from 'react'
import {storiesOf} from '@storybook/react'

import MaterialStepSection from '.'
import Link from '../link'

storiesOf('MaterialStepSection', module)
  .add('default', () => (
    <MaterialStepSection number="1" label="Headline" action={<Link label="change" href="#" />}>
      Material Step Section content
    </MaterialStepSection>
  ))
  .add('selected', () => (
    <MaterialStepSection
      number="1"
      label="Headline"
      selected="Some Material"
      action={<Link label="change" href="#" />}
    >
      Material Step Section content
    </MaterialStepSection>
  ))
  .add('open', () => (
    <MaterialStepSection number="1" label="Headline" action={<Link label="change" href="#" />} open>
      Material Step Section content
    </MaterialStepSection>
  ))
  .add('selected & open', () => (
    <MaterialStepSection
      number="1"
      label="Headline"
      selected="Some Material"
      open
      action={<Link label="change" href="#" />}
    >
      Material Step Section content
    </MaterialStepSection>
  ))
