import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import EditLink from '../../src/app/component/edit-link'

storiesOf('Edit Link', module).add('default', () => (
  <EditLink label="edit" href="#" onClick={action('click')} />
))
