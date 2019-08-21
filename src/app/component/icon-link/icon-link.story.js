import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import IconLink from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

storiesOf('IconLink', module)
  .add('default', () => <IconLink icon={placeholderIcon} onClick={action('onClick')} />)
  .add('disabled', () => <IconLink icon={placeholderIcon} disabled onClick={action('onClick')} />)
