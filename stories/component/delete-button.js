import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import DeleteButton from 'Component/delete-button'

storiesOf('Delete Button', module).add('default', () => <DeleteButton onClick={action('click')} />)
