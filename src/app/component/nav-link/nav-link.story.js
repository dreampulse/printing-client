import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import NavLink from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

storiesOf('NavLink', module)
  .add('default', () => (
    <NavLink onClick={action('onClick')} label="Nav Button" icon={placeholderIcon} />
  ))
  .add('disabled', () => (
    <NavLink disabled onClick={action('onClick')} label="Nav Button" icon={placeholderIcon} />
  ))
