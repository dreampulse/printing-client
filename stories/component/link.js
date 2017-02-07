import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Link from '../../src/app/component/link'

storiesOf('Link', module)
  .add('default', () => (
    <Link label="Default Link" href="#" onClick={action('click')} />
  ))
