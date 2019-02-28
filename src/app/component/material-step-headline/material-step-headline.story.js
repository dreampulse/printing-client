import React from 'react'
import {storiesOf} from '@storybook/react'

import MaterialStepHeadline from '.'
import Link from '../link'

storiesOf('MaterialStepHeadline', module)
  .add('default', () => <MaterialStepHeadline number="1">Headline</MaterialStepHeadline>)
  .add('selected', () => (
    <MaterialStepHeadline
      number="1"
      selected="Some Material"
      change={<Link label="change" href="#" />}
    >
      Headline
    </MaterialStepHeadline>
  ))
