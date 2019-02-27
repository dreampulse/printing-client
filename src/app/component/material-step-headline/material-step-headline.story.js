import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MaterialStepHeadline from '.'
import Link from '../link'

storiesOf('MaterialStepHeadline', module)
  .add('default', () => <MaterialStepHeadline number="1">Headline</MaterialStepHeadline>)
  .add('selected', () => (
    <MaterialStepHeadline
      number="1"
      selected="Some Material"
      change={
        <Link
          label="change"
          href="#"
          onClick={e => {
            e.preventDefault()
            action('onClick')(e)
          }}
        />
      }
    >
      Headline
    </MaterialStepHeadline>
  ))
