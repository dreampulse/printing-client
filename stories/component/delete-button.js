import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import DeleteButton from 'Component/delete-button'

storiesOf('Delete Button', module)
  .add('default', () => (
    <DeleteButton onClick={action('click')} />
  ))
